(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("HomeController", HomeController);

    function HomeController($location, $rootScope, UserService, ExternalService) {
        var vm = this;
        //event handlers
        vm.searchRecipes = getResults;
        function init() {
            vm.foodByWeather = foodByWeather;
            if ($rootScope.loggedIn) {
                if ($rootScope.currentUser && $rootScope.currentUser.isAdmin) {
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
        }
        function login() {
            $location.url('/login');
        }

        function getResults(query) {
                $location.url("results/" + query);
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