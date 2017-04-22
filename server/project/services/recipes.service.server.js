module.exports = function (app) {
    var model = require('../models/user/recipes.model.server')();

    app.post('/api/project/recipe', saveRecipe);
    // app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    // app.get('/api/page/:pageId', findPageById);
    // app.put('/api/page/:pageId', updatePage);
    // app.delete('/api/page/:pageId', deletePage);
    function saveRecipe(req, res) {
        model
            .saveRecipe(req.body)
            .then(function (recipe) {
                res.json(recipe._id);
            });
    }
    function findAllPagesForWebsite(req, res) {
        model
            .findAllPagesForWebsite(req.params.websiteId)
            .then(function (pages) {
                res.json(pages);
            });
    }
    function findRecipeByUrl(url) {
        model
            .findRecipeByUrl(url)
            .then(function (res) {
                return res;
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