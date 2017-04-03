module.exports = function (app) {
    var model = require('../model/user/user.model.server')();
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/register", register);
    app.get("/api/loggedin", loggedin);
    app.post('/api/logout', logout);
    app.delete("/api/user/:userId", deleteUser);

    function updateUser(req, res) {
        model
            .updateUser(req.params.userId, req.body)
            .then(function (status) {
                res.json(status);
            });
    }

    function createUser(req, res) {
        model
            .createUser(req.body)
            .then(function (user) {
                console.log('service');
                console.log(user);
                res.json(user);
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
        model.findUserByCredentials(req.query.username, req.query.password)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUserByUsername(req, res) {
        model.findUserByUsername(req.query.username)
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
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

};