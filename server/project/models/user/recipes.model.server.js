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
        findLikes: findLikes
    };
    return api;

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
                        console.log(likes);
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
        console.log(recipeId);
        console.log(userId);
        var deferred = q.defer();
        recipeModel
            .update(
                {_id: recipeId},
                {$push: {"users": userId.userId}},
                function (err, status) {
                    console.log(err);
                    console.log(status);
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