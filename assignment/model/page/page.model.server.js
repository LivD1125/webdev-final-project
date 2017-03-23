module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var pageSchema = require('./page.schema.server.js')();
    var pageModel = mongoose.model('AssignmentMongoPages', pageSchema);
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        deletePage: deletePage,
        updatePage: updatePage
    };
    return api;


    function findPageById(pageId) {
        var deferred = q.defer();
        pageModel
            .findById(pageId, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        pageModel
            .find({_website: websiteId}, function (err, websites) {
                deferred.resolve(websites);
            });
        return deferred.promise;
    }

    function updatePage(pageId, page) {
        var deferred = q.defer();
        pageModel
            .update(
                {_id: pageId},
                {$set: {name: page.name,
                        title: page.title,
                        description: page.description,
                        dateCreated: Date.now()}},
                function (err, status) {
                    deferred.resolve(status);
                });
        return deferred.promise;
    }

    function deletePage(pageId) {
        var deferred = q.defer();
        pageModel.remove({_id: pageId}, function (err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function createPage(websiteId, page) {
        var deferred = q.defer();
        page._website = websiteId;
        pageModel.create(page, function(err, pg) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(pg);
            }
        });
        return deferred.promise;
    }
};