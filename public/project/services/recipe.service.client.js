(function () {
    angular
        .module("FinalWebAppMaker")
        .factory("RecipeService", RecipeService);

    function RecipeService($http) {
        var api = {
            "likePage": likePage,
            "saveRecipe": saveRecipe,
            "findRecipeById": findRecipeById
        };
        return api;

        function findRecipeById(id) {
            return $http.get("/api/project/recipe/" + id);
        }

        function likePage(recipeId, userId) {
            var id = {
                userId: userId
            }
            console.log(userId);
            console.log(recipeId);
            return $http.put("/api/project/recipe/"+ recipeId, id);
        }

        function saveRecipe(recipe) {
            return $http.post("/api/project/recipe/", recipe);
        }

    }
})();