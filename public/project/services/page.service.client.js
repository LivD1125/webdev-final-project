(function () {
    angular
        .module("FinalWebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            "likePage": likePage
        };
        return api;


        function likePage(userId, pageInfo) {
            return $http.post("/api/project/user/"+userId, pageInfo);
        }

    }
})();