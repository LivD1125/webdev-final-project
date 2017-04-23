(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        //event handlers
        vm.login = login;

        function init() {
            vm.logText = "Login";
        }

        function login(user) {
            if (!user || !user.username || !user.password) {
                vm.error = "Username and Password Required";
                return;
            }
            UserService
                .login(user)
                .success(
                    function(response) {
                        $rootScope.currentUser = user;
                        $rootScope.loggedIn = true;
                        vm.logText = "Logout";
                        $location.url("/user/");
                    })
                .error(
                    function(response) {
                        vm.error = "Username or Password Incorrect";
                    }
                );

        }
        init();
    }
    function ProfileController($routeParams, $location, $rootScope, UserService, RecipeService) {
        var vm = this;

        // event handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.logText = "Logout";
        vm.logAction = logout;
        vm.profileLink = "#/user";
        vm.profileText = "Profile";
        vm.isViewMore = false;
        vm.userId = $rootScope.currentUser._id;

        function init() {
            vm.user = $rootScope.currentUser;
            getRecipes();
            console.log(vm.user);
            viewMore();
        }
        init();
        function viewMore() {

        }
        function getRecipes() {
            RecipeService.getRecipes(vm.user.recipes).then(function (res) {
                vm.recipes = res.data;
                console.log(vm.recipes);

                if (vm.recipes.length > 9){
                    vm.recipes = res.data.splice(0, 9);
                    vm.isViewMore = true;
                }
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

            function updateUser(newUser) {
                UserService
                    .updateUser(vm.userId, newUser)
                    .success(function(user) {
                        if(user) {
                            vm.message = "User Successfully Updated";
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
    function RegisterController($location, $rootScope, UserService) {
        var vm = this;

        // event handlers
        vm.register = register;
        vm.logText = "Login";
        vm.logAction = login;

        function login() {
            $location.url('/login');
        }
        function register(user, validatepassword) {
            if (!user ||
                !user.username ||
                !user.password ||
                !validatepassword ||
                user.password !== validatepassword) {
                vm.error = "Username, Password required. Validation must match";
                return;
            }
            UserService
                .register(user)
                .then(
                    function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $rootScope.loggedin = true;
                        $location.url("/user/");
                    });
        }

    }
})();