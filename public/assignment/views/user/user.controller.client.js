(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, UserService) {
        var vm = this;
        //event handlers
        vm.login = login;

        function login(user) {
            var promise = UserService
                .findUserByCredentials(user.username, user.password);
            promise.success(function(user){
                if(user) {
                    $location.url("/user/"+user._id);
                } else {
                    vm.error = "User not found";
                }
            });
        }
    }
    function ProfileController($routeParams, UserService) {
        var vm = this;

        // event handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        var userId = $routeParams.uid;

        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function(user){
                vm.user = user;
            });
        }
        init();

        function updateUser(newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function(user) {
                    if(user) {
                        // do nothing
                    } else {
                        vm.error = "error updating user";
                    }
            });
        }
        function deleteUser(userId) {
            UserService
                .deleteUser(userId)
                .success(function(user) {
                    if (user) {
                        vm.mesage = "User Successfully Deleted";
                    } else {
                        vm.error = "Unable to Delete User";
                    }
            });
        }
    }
    function RegisterController($location, UserService) {
        var vm = this;

        // event handlers
        vm.createUser = createUser;


        function createUser(newUser) {
            console.log('createUser');
            UserService
                .createUser(newUser)
                .success(function(user) {
                    vm.message = "Available";
                    $location.url('/user/' + user._id);
                })
                .error(function(err) {
                    vm.message = "Username already taken";
            });;
        }
    }
})();