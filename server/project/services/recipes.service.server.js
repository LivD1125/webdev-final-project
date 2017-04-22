module.exports = function (app) {
    var model = require('../models/user/recipes.model.server')();

    app.post('/api/project/recipe', saveRecipe);
    app.get('/api/project/recipe/:recipeId', findRecipeById);
    // app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    // app.get('/api/page/:pageId', findPageById);
    app.put('/api/project/recipe/:recipeId', updateRecipe);
    app.get('/api/project/recipe/like/:userId/:recipeId', isLiked);
    // app.delete('/api/page/:pageId', deletePage);


    function isLiked(req, res) {
        model.findLikes(req.params.userId, req.params.recipeId).then(function(likes) {
            res.json(likes);
        });
    }
    function saveRecipe(req, res) {
        console.log(req.body.uri);
        var recipe = findRecipeByUrl(req.body.uri);
        console.log(recipe);
        if (recipe === undefined) {
            model
                .saveRecipe(req.body)
                .then(function (recipe) {
                    res.json(recipe._id);
                });
        } else {
            res.json(recipe._id);
        }
    }

    function updateRecipe(req, res) {
        console.log(req.params.recipeId);
        console.log(req.body);
        model
            .updateRecipe(req.params.recipeId, req.body)
            .then(function (status) {
                console.log(status);
                res.json(status);
            });
    }

    function findRecipeById(req, res) {
        model
            .findById(req.params.recipeId)
            .then(function (recipe) {
                res.json(recipe);
            });
    }

    function findRecipeByUrl(url) {
        model
            .findByUrl(url)
            .then(function (res) {
                return res;
            });
    }
};