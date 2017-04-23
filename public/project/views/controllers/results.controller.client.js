(function () {
    angular
        .module("FinalWebAppMaker")
        .controller("ResultsController", ResultsController);

    function ResultsController($routeParams, $location, $rootScope,
                               UserService, ExternalService, RecipeService) {
        var vm = this;

        // event handlers
        vm.seeDetails = seeDetails;
        if ($rootScope.currentUser) {
            if ($rootScope.currentUser.isAdmin) {
                vm.isAdmin = true;
            }
            vm.userId = $rootScope.currentUser._id;
            vm.logText = "Login";
            vm.logAction = login;
            vm.profileLink = "#/user";
            vm.profileText = "Profile";
        } else {
            vm.logText = "Logout";
            vm.logAction = logout;
        }
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
                console.log(res);
                $location.url('/recipe/' + res.data._id);
            });

        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $rootScope.loggedIn = false;
                        $location.url("/welcome");
                        vm.message = "Logout Successful";
                    });
        }
        function login() {
            $location.url('/login');
        }
    }
})();