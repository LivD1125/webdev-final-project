(function () {
    angular
        .module("FinalWebAppMaker")
        .factory("ExternalService", externalService);

    function externalService($http) {
        var api = {
            "getRonSwansonQuote": getRonSwansonQuote,
            "searchResults": searchResults
        };
        return api;

        function getRonSwansonQuote() {
            return $http.get("http://ron-swanson-quotes.herokuapp.com/v2/quotes");
        }

        function searchResults(query) {
            return $http.get("https://api.edamam.com/search?q=" + query + "&app_id=1d1ccaf4&app_key=6d7b56ab0cbba73392b5c5241208148e&from=0&to=20");
        }

    }
})();