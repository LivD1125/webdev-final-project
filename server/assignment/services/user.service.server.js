module.exports = function (app) {
    var model = require('../model/user/user.model.server')();
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
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    app.get('/api/user', findUserByUsername);
    app.get('/api/user/:userId', findUserById);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/register", register);
    app.get("/api/loggedin", loggedin);
    app.post('/api/logout', logout);
    app.delete("/api/user/:userId", deleteUser);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    function updateUser(req, res) {
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