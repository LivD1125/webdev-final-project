(function() {
    angular
        .module("FinalWebAppMaker")
        .config(Config);
    function Config($routeProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: 'LoginController',
                controllerAs: "model",
                resolve: { loggedin: checkLoggedOut}
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedOut }
            })
            .when("/settings", {
                templateUrl: "views/user/settings.view.client.html",
                controller: "SettingsController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/welcome", {
                templateUrl: "views/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedinNoRoute }
            })
        .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
        .when("/user/:userId", {
            templateUrl: "views/user/public-profile.view.client.html",
            controller: "PublicProfileController",
            controllerAs: "model",
            resolve: { loggedin: checkLoggedin }
        }).
        when("/results/:query", {
            templateUrl: "views/results.view.client.html",
            controller: "ResultsController",
            controllerAs: "model"
        }).
        when('/recipe/:recipeId', {
            templateUrl: "views/recipe.view.client.html",
            controller: "RecipeController",
            controllerAs: "model",
            resolve: { loggedin: checkLoggedin }
        }).
        when('/weather', {
            templateUrl: "views/weather.view.client.html",
            controller: "WeatherController",
            controllerAs: "model"
        }).
        when('/weather/:query', {
            templateUrl: "views/weather-results.view.client.html",
            controller: "WeatherResultsController",
            controllerAs: "model"
        });

    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/login');

            }
        });
        return deferred.promise;
    };
    var checkLoggedOut = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin').success(function(user) {
            if (user !== '0') {
                deferred.resolve();
                $location.url('/user');
            } else {
                deferred.resolve();
            }
        });
        return deferred.promise;
    };
    var checkLoggedinNoRoute = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.loggedIn = true;
                deferred.resolve();
            } else {
                deferred.resolve();
                $rootScope.loggedIn = false;

            }
        });
        return deferred.promise;
    };
})();