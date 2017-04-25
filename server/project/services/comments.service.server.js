module.exports = function (app) {
    var model = require('../models/user/comments.model.server')();

    app.post('/api/project/comment', saveComment);
    app.get('/api/project/recipe/:recipeId', findRecipeById);
    // app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    // app.get('/api/page/:pageId', findPageById);
    app.post('/api/project/comments', getComments);
    // app.delete('/api/page/:pageId', deletePage);

    function getComments(req, res) {
        model.getComments(req.body).then(function(comments) {
            res.json(comments);
        });
    }
    function saveComment(req, res) {
        model
            .saveComment(req.body)
            .then(function (comm) {
                res.json(comm);
            });
    }

    function findRecipeById(req, res) {
        model
            .findById(req.params.recipeId)
            .then(function (recipe) {
                res.json(recipe);
            });
    }
};