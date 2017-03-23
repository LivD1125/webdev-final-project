module.exports = function (app) {
    var model = require('../model/website/website.model.server')();

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function findAllWebsitesForUser(req, res) {
        model
            .findAllWebsitesForUser(req.params.userId)
            .then(function (websites) {
                res.json(websites);
            });
    }
    function createWebsite(req, res) {
        model
            .createWebsiteForUser(req.params.userId, req.body)
            .then(function (user) {
                res.json(user);
            });
    }
    function findWebsiteById(req, res) {
        model
            .findWebsiteById(req.params.websiteId)
            .then(function (user) {
                res.json(user);
            });
    }
    function updateWebsite(req, res) {
        model
            .updateWebsite(req.params.websiteId, req.body)
            .then(function (status) {
                res.json(status);
            });
    }
    function deleteWebsite(req, res) {
        model
            .deleteWebsite(req.params.websiteId)
            .then(function (status) {
                res.json(status);
            });
    }


};