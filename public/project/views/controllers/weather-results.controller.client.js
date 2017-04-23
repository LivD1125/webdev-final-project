(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("WeatherResultsController", weatherResultsController);

    function weatherResultsController($routeParams, $location, $rootScope, UserService, ExternalService) {
        var vm = this;
        //event handlers
        vm.foodByWeather = foodByWeather;
        function init() {
            if ($rootScope.loggedIn) {
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
                console.log(vm.weatherForecast);
            });
        }
        function foodByWeather(query) {
            ExternalService.findWeather(query).then(function(res) {
                vm.weatherData = res.data;
                getFoodOptions(we)
            });
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