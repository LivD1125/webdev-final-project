(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("AdminSettingsController", adminSettingsController);

    function adminSettingsController($routeParams, $location, $rootScope, UserService) {
        var vm = this;

        // event handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            if ($rootScope.currentUser.isAdmin) {
                vm.isAdmin = true;
            }
            vm.logText = "Logout";
            vm.logAction = logout;
            vm.profileLink = "#/user";
            vm.profileText = "Profile";
            var promise = UserService.findUserById($routeParams.userId);
            promise.success(function(user){
                vm.user = user;
                vm.userId = user._id;
                if ($rootScope.currentUser._id !== vm.userId) {
                    vm.canDelete = true;
                }
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
            console.log(newUser);
            UserService
                .updateUser(vm.userId, newUser)
                .success(function(user) {
                    if(user) {
                        vm.message = "User Successfully Updated";
                        $location.url('/admin');
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
                        $location.url('/admin');
                    } else {
                        vm.error = "Unable to Delete User";
                    }
                });
        }
    }
})();