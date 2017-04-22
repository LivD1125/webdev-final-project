module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var recipesSchema = require('./recipes.schema.server.js')();

    var recipeModel = mongoose.model('ProjectMongoRecipes', recipesSchema);

    var api = {
        saveRecipe: saveRecipe
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

    function findByUrl(url) {
        var deferred = q.defer();
        recipeModel.findOne({url: url}, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

   };