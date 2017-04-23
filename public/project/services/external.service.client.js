(function () {
    angular
        .module("FinalWebAppMaker")
        .factory("ExternalService", externalService);

    function externalService($http) {
        var api = {
            "searchResults": searchResults,
            "findWeather": findCurrentWeather,
            "getForecast": getForecast
        };
        return api;


        function findCurrentWeather(query) {
            return $http.get("http://api.openweathermap.org/data/2.5/weather?zip="
                +query+"&units=imperial&APPID=c2e919e9c4bd3e0d1349fc581db46c27");
        }
        function getForecast(query) {
            return $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?zip="
                +query+"&units=imperial&APPID=c2e919e9c4bd3e0d1349fc581db46c27");
        }
        function searchResults(query) {
            return $http.get("https://api.edamam.com/search?q="
                +query+"&app_id=1d1ccaf4&app_key=6d7b56ab0cbba73392b5c5241208148e&from=0&to=50");
        }
    }
})();