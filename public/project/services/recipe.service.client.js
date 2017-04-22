(function () {
    angular
        .module("FinalWebAppMaker")
        .factory("RecipeService", RecipeService);

    function RecipeService($http) {
        var api = {
            "likePage": likePage,
            "saveRecipe": saveRecipe,
            "findRecipeById": findRecipeById,
            "isLiked": isLiked
        };
        return api;

        function isLiked(recipeId, userId) {
            return $http.get("/api/project/recipe/like/" + userId + "/" + recipeId);
        }
        function findRecipeById(id) {
            return $http.get("/api/project/recipe/" + id);
        }

        function likePage(recipeId, userId) {
            var id = {
                userId: userId
            };
            return $http.put("/api/project/recipe/"+ recipeId, id);
        }

        function saveRecipe(recipe) {
            return $http.post("/api/project/recipe/", recipe);
        }

    }
})();