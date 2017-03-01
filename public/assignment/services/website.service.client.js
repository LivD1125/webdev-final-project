(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "createWebsite": createWebsite,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite
        };
        return api;

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website", website);
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/"+"websiteId", website);
        }

        function deleteWebsite(websiteId) {
            return $http.del("/api/website/"+websiteId);
        }

        function findWebsiteById(websiteId) {
           return $http.get("/api/website/"+websiteId);
        }
    }
})();