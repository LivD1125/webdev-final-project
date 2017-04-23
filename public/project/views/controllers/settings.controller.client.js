(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("SettingsController", SettingsController);

    function SettingsController($routeParams, $location, $rootScope, UserService) {
        var vm = this;

        // event handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.user = $rootScope.currentUser;
        vm.userId = $rootScope.currentUser._id;

        function init() {
            if ($rootScope.currentUser.isAdmin) {
                vm.isAdmin = true;
            }
            vm.logText = "Logout";
            vm.logAction = logout;
            vm.profileLink = "#/user";
            vm.profileText = "Profile";
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

        function updateUser(newUser) {
            UserService
                .updateUser(vm.userId, newUser)
                .success(function(user) {
                    if(user) {
                        vm.message = "User Successfully Updated";
                        $location.url('/user');
                    } else {
                        vm.error = "error updating user";
                    }
                });
        }
        function deleteUser() {
            UserService
                .deleteUser(vm.userId)
                .success(function(user) {
                    if (user) {
                        vm.message = "User Successfully Deleted";
                    } else {
                        vm.error = "Unable to Delete User";
                    }
                });
        }
    }
})();