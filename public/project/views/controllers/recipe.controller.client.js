(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("RecipeController", RecipeController);

    function RecipeController($routeParams, $location,
                              $rootScope, UserService, RecipeService, CommentsService) {
        var vm = this;
        vm.recipeId = $routeParams.recipeId;
        // event handlers
        vm.logout = logout;
        vm.likePage = likePage;
        vm.logAction = logout;
        vm.createComment = createComment;
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
                getComments();
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

        function createComment(comment) {
            comment.user = vm.userId;
            comment.recipe = vm.recipeId;
            CommentsService.saveComment(comment).then(function(res) {
                vm.comments.push(res.data);
                RecipeService.addComment(vm.recipeId, res.data._id).then(function(res) {
                    //fire and forget
                });
            });
        }

        function getComments() {
            CommentsService.getComments(vm.recipe.comments).then(function (res) {
                vm.comments = res.data;

                if (vm.comments.length != 0){
                    vm.hasComments = true;
                }
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