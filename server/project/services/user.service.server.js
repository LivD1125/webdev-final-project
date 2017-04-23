module.exports = function (app) {
    var model = require('../models/user/user.model.server')();
    var passport = require('passport');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var FacebookStrategy = require('passport-facebook').Strategy;

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID || '494222524301662',
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET || 'e5007b91c5a623dd3e5c78acb3ee0f9f',
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL  || '/auth/project/facebook/callback'
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    app.get('/api/project/user', findUserByUsername);
    app.get('/api/project/user/:userId', findUserById);
    app.get("/api/project/user?username=username", findUserByUsername);
    app.get("/api/project/user?username=username&password=password", findUserByCredentials);
    app.put("/api/project/user/:userId", updateUser);
    app.post("/api/project/login", passport.authenticate('local'), login);
    app.post("/api/project/register", register);
    app.get("/api/project/loggedin", loggedin);
    app.post('/api/project/logout', logout);
    app.delete("/api/project/user/:userId", deleteUser);
    app.get ('/auth/project/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.put('/api/project/user/like/:userId', likeRecipe);
    app.post('/api/project/recipes/users', getUsers);
    app.put('/api/project/user/follow/:currentUser', followUser);
    app.post('/api/project/user/followers', getFollowers);
    app.get('/auth/project/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));

    function followUser(req, res) {
        model.follow(req.params.currentUser, req.body.profileUser).then(function(resp) {
            model.addFollower(req.body.profileUser, req.params.currentUser).then(function(respo) {
                const fol = {
                    follow: resp,
                    follower: respo
                };
                res.json(fol);
            });
        });
    }

    function getFollowers(req, res) {
        model.getFollowers(req.body).then(function(users) {
            res.json(users);
        });
    }
    function getUsers(req, res) {
        model.getUsers(req.body).then(function(users) {
            res.json(users);
        });
    }

    function likeRecipe(req, res) {
        model
            .likeRecipe(req.params.userId, req.body)
            .then(function (status) {
                res.json(status);
            });
    }

    function updateUser(req, res)
    {
        model
            .updateUser(req.params.userId, req.body)
            .then(function (status) {
                res.json(status);
            });
    }

    function deleteUser(req, res) {
        model
            .deleteUser(req.params.userId)
            .then(function (status) {
                res.json(status);
            });
    }

    function findUserById(req, res) {
        model
            .findUserById(req.params.userId)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUserByCredentials(req, res) {
        model.findUserByCredentials(req.query.username.toLocaleLowerCase(), req.query.password)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUserByUsername(req, res) {
        model.findUserByUsername(req.query.username.toLocaleLowerCase())
            .then(function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatu(404);
                }
            });
    }
    function register(req, res) {
        var user = req.body;
        user.username = user.username.toLocaleLowerCase();
        user.password = bcrypt.hashSync(user.password);
        model
            .createUser(user)
            .then(function (user) {
                req.login(user, function (err) {
                    if(err) {
                        res.send(400)
                    } else {
                        res.json(user);
                    }
                });
            });
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }
    function localStrategy(username, password, done) {
        model
            .findUserByUsername(username.toLocaleLowerCase())
            .then(
                function(user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function serializeUser(user, done) {
        return done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    return done(err, null);
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .findUserByFacebookId(profile.id)
            .then(function(user) {
                    if (!user) {
                        var newUser = {
                            username: profile.displayName.toLocaleLowerCase().replace(/\s+/g, '_'),
                            password: profile.id.toString(),
                            firstName: profile.displayName,
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        model
                            .createUser(newUser)
                            .then(
                                function (user) {
                                    return done(null, user);
                                },
                                function (error) {
                                    return done(error, null);
                                });
                    } else {
                        return done(null, user);
                    }
            },
            function(err) {
                if(err) {
                    return done(err);
                }
            });
    }


};