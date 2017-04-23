(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("WeatherResultsController", weatherResultsController);

    function weatherResultsController($routeParams, $location, $rootScope,
                                      UserService, ExternalService, RecipeService) {
        var vm = this;
        //event handlers
        vm.foodByWeather = foodByWeather;
        vm.seeDetails = seeDetails;
        function init() {
            if ($rootScope.loggedIn) {
                if ($rootScope.currentUser.isAdmin) {
                    vm.isAdmin = true;
                }
                vm.logText = "Logout";
                vm.logAction = logout;
                vm.profileLink = "#/user";
                vm.profileText = "Profile";
            } else {
                vm.logText = "Login";
                vm.logAction = login;
            }
            vm.query = $routeParams.query;
            foodByWeather($routeParams.query);
            forecast($routeParams.query);
        }

        function login() {
            $location.url('/login');
        }
        function forecast(query) {
            ExternalService.getForecast(query).then(function(res) {
                vm.weatherForecast = res.data;
            });
        }
        function foodByWeather(query) {
            ExternalService.findWeather(query).then(function(res) {
                vm.weatherData = res.data;
                getFoodOptions(vm.weatherData, vm.weatherForecast);
            });
        }

        function seeDetails(recipe) {
            RecipeService.saveRecipe(recipe).then(function(res) {
                $location.url('/recipe/' + res.data._id);
            });

        }

        function getFoodOptions() {
            if (vm.weatherData.main.temp > 90) {
                ExternalService.searchResults('fruit').then(function(resp) {
                    var random = Math.floor(Math.random() *  resp.data.hits.length - 5);
                    vm.results = resp.data.hits.slice(random, random + 4);
                });
            } else if  (vm.weatherData.main.temp > 75) {
                ExternalService.searchResults('fruit').then(function(resp) {
                    var random = Math.floor(Math.random() *  resp.data.hits.length - 5);
                    vm.results = resp.data.hits.slice(random, random + 4);
                });

            } else if (vm.weatherData.main.temp > 60) {
                ExternalService.searchResults('fruit').then(function(resp) {
                    var random = Math.floor(Math.random() *  resp.data.hits.length - 5);
                    vm.results = resp.data.hits.slice(random, random + 4);
                });

            } else if (vm.weatherData.main.temp > 45) {
                ExternalService.searchResults('fruit').then(function(resp) {
                    var random = Math.floor(Math.random() *  resp.data.hits.length - 5);
                    vm.results = resp.data.hits.slice(random, random + 4);
                });

            } else if (vm.weatherData.main.temp > 30) {
                ExternalService.searchResults('fruit').then(function(resp) {
                    var random = Math.floor(Math.random() *  resp.data.hits.length - 5);
                    vm.results = resp.data.hits.slice(random, random + 4);
                });

            } else {
                ExternalService.searchResults('fruit').then(function(resp) {
                    var random = Math.floor(Math.random() *  resp.data.hits.length - 5);
                    vm.results = resp.data.hits.slice(random, random + 4);
                });
            }
        }
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $rootScope.loggedIn = false;
                        $location.url("/login");
                        vm.message = "Logout Successful";
                    });
        }

        init();
    }
})();