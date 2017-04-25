(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("PublicProfileController", PublicProfileController);

    function PublicProfileController($routeParams, $location, $rootScope, UserService, RecipeService) {
    var vm = this;

    // event handlers
    vm.logout = logout;
    vm.logText = "Logout";
    vm.logAction = logout;
    vm.followUser = followUser;
    vm.profileLink = "#/user";
    vm.profileText = "Profile";
    vm.isViewMore = false;
    vm.notFollowing = true;
    vm.userId = $rootScope.currentUser._id;

    function init() {
        if (vm.userId === $routeParams.userId) {
            $location.url('/user');
        }
        if ($rootScope.currentUser.isAdmin) {
            vm.isAdmin = true;
        }
        var promise = UserService.findUserById($routeParams.userId);
        promise.success(function(user){
            vm.user = user;
            vm.notFollowing = true;
            vm.isFollowing = false;
            if (vm.user.follower.indexOf(vm.userId) !== -1){
                vm.notFollowing = false;
                vm.isFollowing = true;
            }
            if(vm.user.follower && vm.user.follower.length !== 0) {
                vm.hasFollowers = true;
            }
            if(vm.user.following && vm.user.following.length !== 0) {
                vm.hasFollowing = true;
            }
            getRecipes();
            getFollowers();
        });
    }
    init();

        function getRecipes() {
            RecipeService.getRecipes(vm.user.recipes).then(function (res) {
                vm.recipes = res.data;
                const rec = res.data.slice();
                if (rec.length > 9){
                    vm.recipesShortened = rec.splice(0, 9);
                    vm.isViewMore = true;
                } else {
                    vm.recipesShortened = res.data;
                    vm.addMore = true;
                }
            });
        }

    function followUser() {
        UserService.follow(vm.userId, vm.user._id).then(function(res) {
            vm.notFollowing = false;
            vm.isFollowing = true;
        });
    }

    function getFollowers() {
        UserService.getFollowers(vm.user.follower, vm.user.following).then(function(res){
            vm.followers = res.data.followers;
            vm.following = res.data.following;
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
}
})();