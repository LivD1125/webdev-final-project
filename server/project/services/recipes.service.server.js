module.exports = function (app) {
    var model = require('../models/user/recipes.model.server')();

    app.post('/api/project/recipe', saveRecipe);
    app.get('/api/project/recipe/:recipeId', findRecipeById);
    // app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    // app.get('/api/page/:pageId', findPageById);
    app.put('/api/project/recipe/:recipeId', updateRecipe);
    app.get('/api/project/recipe/like/:userId/:recipeId', isLiked);
    app.post('/api/project/recipes', getRecipes);
    // app.delete('/api/page/:pageId', deletePage);

    function getRecipes(req, res) {
        model.getRecipes(req.body).then(function(recipes) {
            res.json(recipes);
        });
    }

    function isLiked(req, res) {
        model.findLikes(req.params.userId, req.params.recipeId).then(function(likes) {
            res.json(likes);
        });
    }
    function saveRecipe(req, res) {
        model
            .findByUrl(req.body.uri)
            .then(function (response) {
                if (!response) {
                    model
                        .saveRecipe(req.body)
                        .then(function (recipe) {
                            res.json(recipe);
                        });
                } else {
                    model
                        .findByUrl(req.body.uri).
                            then(function (resp) {
                                res.json(resp);
                    });
                }
            });
    }

    function updateRecipe(req, res) {
        model
            .updateRecipe(req.params.recipeId, req.body)
            .then(function (status) {
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

    }
};