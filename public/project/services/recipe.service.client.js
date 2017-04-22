(function () {
    angular
        .module("FinalWebAppMaker")
        .factory("RecipeService", RecipeService);

    function RecipeService($http) {
        var api = {
            "likePage": likePage,
            "saveRecipe": saveRecipe
        };
        return api;


        function likePage(userId, pageInfo) {
            return $http.post("/api/project/user/"+userId, pageInfo);
        }

        function saveRecipe(recipe) {
            return $http.post("/api/project/recipe/", recipe);
        }

    }
})();