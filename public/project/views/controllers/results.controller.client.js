(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("ResultsController", ResultsController);

    function ResultsController($routeParams, $location, $rootScope,
                               UserService, ExternalService, RecipeService) {
        var vm = this;

        // event handlers
        vm.logout = logout;
        vm.seeDetails = seeDetails;
        if ($rootScope.currentUser) {
            vm.userId = $rootScope.currentUser._id;
        }
        vm.logText = "Logout";
        vm.logAction = logout;
        function init() {
            getResults();
            var promise = UserService.findUserById(vm.userId);
            promise.success(function(user){
                vm.user = user;
            });
        }
        init();

        function getResults() {
            ExternalService.searchResults($routeParams.query).then(function(res) {
                vm.query = $routeParams.query;
                vm.showResults = res.data;
                vm.searchQ = $routeParams.query;
            });
        }
        function seeDetails(recipe) {
            RecipeService.saveRecipe(recipe).then(function(res) {
                $rootScope.currentRecipe = recipe;
                $location.url('/recipe/' + res.data);
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
            PageService.likePage(vm.userId, vm.showOverview).then(function(res) {
                vm.liked = "Liked";
                vm.likedClass = "btn-success";
            })
        }
    }
})();