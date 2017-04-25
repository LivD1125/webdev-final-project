module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var commentsSchema = require('./comments.schema.server.js')();

    var commentsModel = mongoose.model('ProjectMongoComments', commentsSchema);

    var api = {
        saveComment: saveComment,
        findById: findById,
        findByUrl: findByUrl,
        getComments: getComments
    };
    return api;

    function getComments(commentIds) {
        var deferred = q.defer();
        commentsModel.find({ "_id" : { $in : commentIds } }, function(err, comments) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(comments);
            }
        });
        return deferred.promise;
    }

    function saveComment(comment) {
        var deferred = q.defer();
        commentsModel.create(comment, function(err, pg) {
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
        commentsModel.findOne({uri: url}, function (err, status) {
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
        commentsModel
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