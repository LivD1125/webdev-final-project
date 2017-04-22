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
        vm.logText = "Login";
        vm.logAction = logout;
        if ($rootScope.currentUser) {
            vm.userId = $rootScope.currentUser._id;
            vm.logText = "Logout";
            vm.logAction = logout;
        }

        function init() {
            var promise = RecipeService.findRecipeById(vm.recipeId);
            promise.success(function(recipe){
                vm.recipe = recipe;
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

        function likePage() {
            RecipeService.likePage(vm.recipeId, vm.userId).then(function(res) {
                console.log("liked!");
                vm.liked = "Liked";
                vm.likedClass = "btn-success";
            });
        }
    }
})();