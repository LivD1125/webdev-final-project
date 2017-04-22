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
        vm.userId = $rootScope.currentUser._id;
        vm.logText = "Logout";

        function init() {
            var promise = RecipeService.findRecipeById(vm.recipeId);
            promise.success(function(recipe){
                vm.recipe = recipe;
            });
            isLiked();
        }
        init();

        function isLiked() {
            RecipeService.isLiked(vm.recipeId, vm.userId).then(function(res) {
                vm.likeCount = res.data.count;
                if (res.data.isLiked) {
                    vm.isLiked = "Liked";
                    vm.isLikedAction = "";
                } else {
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
                console.log("go go go");
            })
        }
    }
})();