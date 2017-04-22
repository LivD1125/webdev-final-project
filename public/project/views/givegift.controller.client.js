(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("GiveController", GiveController);

    function GiveController($routeParams, $location, $rootScope, UserService) {
        var vm = this;

        // event handlers
        vm.logout = logout;

        vm.userId = $rootScope.currentUser._id;
        vm.logText = "Logout";
        vm.logAction = logout;
        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function(user){
                vm.user = user;
            });
        }
        init();

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
    }
})();