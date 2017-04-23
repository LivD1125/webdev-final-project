(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("AdminController", AdminController);

    function AdminController($location, $rootScope, UserService, ExternalService) {
        var vm = this;
        //event handlers
        function init() {
            vm.foodByWeather = foodByWeather;
            vm.logText = "Logout";
            vm.logAction = logout;
            vm.profileLink = "#/user";
            vm.profileText = "Profile";
            vm.isAdmin = true;

            getAllUsers();
        }
        function login() {
            $location.url('/login');
        }

        function getAllUsers() {
            UserService.getAllUsers().then(function(users) {
                vm.users = users.data;
            });
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