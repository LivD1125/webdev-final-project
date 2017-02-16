(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login(user) {
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if(loginUser != null) {
                $location.url('/user/' + loginUser._id);
            } else {
                vm.error = 'user not found';
            }
        }
    }
    function ProfileController($routeParams, UserService) {
        var vm = this;

        // event handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        var userId = $routeParams['uid'];

        function init() {
            var user = UserService.findUserById(userId);
            vm.user = user;
        }
        init();

        function updateUser(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user != null) {
                vm.message = "User Successfully Updated!"
            } else {
                vm.error = "Unable to update user";
            }
        }
        function deleteUser(userId) {
            var user = UserService.deleteUser(userId);
            if(user != null) {
                vm.message = "User Successfully Deleted!";
            } else {
                vm.error = "Unable to update user";
            }
        }
    }
    function RegisterController($location, UserService) {
        var vm = this;

        // event handlers
        vm.createUser = createUser;


        function createUser(newUser) {
            console.log('createUser');
            var user = UserService.createUser(newUser);
            console.log(user);
            if(user != null) {
                vm.message = "User Successfully Updated!";
                $location.url('/user/' + user._id);
            } else {
                vm.error = "Unable to update user";
            }
        }
    }
})();