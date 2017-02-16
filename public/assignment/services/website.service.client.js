(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
        ];
        var api = {
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "createWebsite": createWebsite,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite
        };
        return api;

        function createWebsite(userId, website) {
            w = website;
            w.developerId = userId;
            websites.push(w);
            return angular.copy(w);

        }

        function updateWebsite(websiteId, website) {
            for(var w in websites) {
                if( websites[w]._id === websiteId ) {
                    websites[w].name = website.name;
                    websites[w].update = new Date();
                    websites[w].description = website.description;
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function deleteWebsite(websiteId) {
            var del = null;
            for(var w in websites) {
                if(websiteId === websites[w]._id) {
                    del = websites[w];
                    break;
                }
            }
            if (del != null) {
                websites.remove(del);
                return angular.copy(del);
            }
            return null;
        }

        function findWebsitesByUser(userId) {
            var webs = [];
            for (var w in websites) {
                if (websites[w].developerId === userId) {
                    webs.push(websites[w]);
                }
            }
            return angular.copy(webs);
        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websiteId === websites[w]._id) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }
    }
})();