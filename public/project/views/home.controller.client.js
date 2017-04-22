(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("HomeController", HomeController);

    function HomeController($location, $rootScope, UserService, ExternalService) {
        var vm = this;
        //event handlers
        vm.searchRecipes = getResults;
        function init() {
            if ($rootScope.loggedIn) {
                vm.logText = "Logout";
                vm.logAction = logout;
            } else {
                vm.logText = "Login";
                vm.logAction = login;
            }
        }
        function login() {
            $location.url('/login');
        }

        function getResults(query) {
            ExternalService.searchResults(query).then(function(res) {
                $rootScope.query = query;
                $rootScope.data = res.data;
                $location.url("results/" + query);
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