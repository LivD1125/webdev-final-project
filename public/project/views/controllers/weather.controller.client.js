(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("WeatherController", weatherController);

    function weatherController($location, $rootScope, UserService, ExternalService) {
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
        }

        function login() {
            $location.url('/login');
        }

        function foodByWeather(query) {
                $location.url("weather/" + query);
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