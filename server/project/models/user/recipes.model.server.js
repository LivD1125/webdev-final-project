module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var recipesSchema = require('./recipes.schema.server.js')();

    var recipeModel = mongoose.model('ProjectMongoRecipes', recipesSchema);

    var api = {
        saveRecipe: saveRecipe,
        findById: findById,
        findByUrl: findByUrl,
        updateRecipe: updateRecipe,
        findLikes: findLikes,
        getRecipes: getRecipes
    };
    return api;

    function getRecipes(recipeIds) {
        var deferred = q.defer();
        recipeModel.find({ "_id" : { $in : recipeIds } }, function(err, recipes) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(recipes);
            }
        });
        return deferred.promise;
    }
    function findLikes(userId, recipeId) {
        var deferred = q.defer();
        var likes = {};
        recipeModel
            .findById(recipeId, function (err, recipe) {
                if(err) {
                    deferred.reject(err);
                } else {
                    if (recipe.users.indexOf(userId) > -1) {
                        likes = {
                            isLiked: true,
                            count: recipe.users.length
                        };
                    } else {
                        likes = {
                            isLiked: false,
                            count: recipe.users.length
                        }
                    }
                    deferred.resolve(likes);
                }
            });
        return deferred.promise;
    }
    function saveRecipe(recipe) {
        var deferred = q.defer();
        recipeModel.create(recipe, function(err, pg) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(pg);
            }
        });
        return deferred.promise;
    }

    function updateRecipe(recipeId, userId) {
        var deferred = q.defer();
        recipeModel
            .update(
                {_id: recipeId},
                {$push: {"users": userId.userId}},
                function (err, status) {
                    console.log(err);
                    deferred.resolve(status);

                });
        return deferred.promise;
    }

    function findByUrl(url) {
        var deferred = q.defer();
        recipeModel.findOne({uri: url}, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findById(id) {
        var deferred = q.defer();
        recipeModel
            .findById(id, function (err, recipe) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(recipe);
                }
            });
        return deferred.promise;
    }

   };