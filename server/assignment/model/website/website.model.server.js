module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server.js')();
    var websiteModel = mongoose.model('AssignmentMongoWebsites', websiteSchema);
    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findWebsiteById: findWebsiteById,
        findAllWebsitesForUser: findAllWebsitesForUser,
        deleteWebsite: deleteWebsite,
        updateWebsite: updateWebsite
    };
    return api;


    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        websiteModel
            .findById(websiteId, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        websiteModel
            .find({_user: userId}, function (err, websites) {
                deferred.resolve(websites);
            });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        websiteModel
            .update(
                {_id: websiteId},
                {$set: {name: website.name,
                        description: website.description,
                        dateCreated: Date.now()}},
                function (err, status) {
                    deferred.resolve(status);
                });
        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        websiteModel.remove({_id: websiteId}, function (err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function createWebsiteForUser(userId, website) {
        var deferred = q.defer();
        website._user = userId;
        websiteModel.create(website, function(err, wsite) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(wsite);
            }
        });
        return deferred.promise;
    }
};