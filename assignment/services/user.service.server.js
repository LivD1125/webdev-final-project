module.exports = function (app) {
    var model = require('../model/user/user.model.server')();

    // app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
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

};