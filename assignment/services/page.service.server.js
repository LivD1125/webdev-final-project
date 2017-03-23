module.exports = function (app) {
    var model = require('../model/page/page.model.server')();

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);
    function createPage(req, res) {
        model
            .createPage(req.params.websiteId, req.body)
            .then(function (website) {
                res.json(website);
            });
    }
    function findAllPagesForWebsite(req, res) {
        model
            .findAllPagesForWebsite(req.params.websiteId)
            .then(function (pages) {
                res.json(pages);
            });
    }
    function findPageById(req, res) {
        model
            .findPageById(req.params.pageId)
            .then(function (page) {
                res.json(page);
            });
    }
    function updatePage(req, res) {
        model
            .updatePage(req.params.pageId, req.body)
            .then(function (status) {
                res.json(status);
            });
    }

    function deletePage(req, res) {
        model
            .deletePage(req.params.pageId)
            .then(function (status) {
                res.json(status);
            });
    }
};