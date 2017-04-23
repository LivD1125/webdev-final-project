(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("RecipeController", RecipeController);

    function RecipeController($routeParams, $location,
                              $rootScope, UserService, RecipeService) {
        var vm = this;
        vm.recipeId = $routeParams.recipeId;
        // event handlers
        vm.logout = logout;
        vm.likePage = likePage;
        vm.logAction = logout;
        vm.profileLink = "#/user";
        vm.profileText = "Profile";
        vm.userId = $rootScope.currentUser._id;
        vm.logText = "Logout";

        function init() {
            if ($rootScope.currentUser.isAdmin) {
                vm.isAdmin = true;
            }
            var promise = RecipeService.findRecipeById(vm.recipeId);
            promise.success(function(recipe){
                vm.recipe = recipe;
                getUsers();
            });

            isLiked();
        }
        init();

        function isLiked() {
            RecipeService.isLiked(vm.recipeId, vm.userId).then(function(res) {
                vm.likeCount = res.data.count;
                if (res.data.isLiked) {
                    vm.checkLiked = true;
                    vm.isLiked = "Liked";
                    vm.isLikedAction = "";
                } else {
                    vm.notLiked= true;
                    vm.isLiked = "Like";
                    vm.isLikedAction = likePage;
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

        function likePage() {
            RecipeService.likePage(vm.recipeId, vm.userId).then(function(res) {
                vm.isLiked = "Liked";
                vm.likeCount = vm.likeCount + 1;
                vm.likedClass = "btn-success";
            });
            UserService.likePage(vm.recipeId, vm.userId).then(function(res) {
                //fire and forget
            });
        }

        function getUsers() {
            UserService.getUsers(vm.recipe.users).then(function (res) {
                vm.users = res.data;

                if (vm.users.length > 9){
                    vm.users = res.data.splice(0, 9);
                    vm.isViewMore = true;
                }
            });
        }
    }
})();