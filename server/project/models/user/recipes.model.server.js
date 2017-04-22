module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var recipesSchema = require('./recipes.schema.server.js')();

    var recipeModel = mongoose.model('ProjectMongoRecipes', recipesSchema);

    var api = {
        saveRecipe: saveRecipe,
        findById: findById,
        findByUrl: findByUrl,
        updateRecipe: updateRecipe
    };
    return api;

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
                {$push: {"users": userId}},
                function (err, status) {
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