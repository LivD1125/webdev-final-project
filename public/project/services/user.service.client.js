(function () {
    angular
        .module("FinalWebAppMaker")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserByUsername": findUserByUsername,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "login": login,
            "logout": logout,
            "loggedin": loggedin,
            "register": register,
            "likePage": likePage,
            "getUsers": getUsers,
            "follow": follow,
            "getFollowers":getFollowers
        };
        return api;

        function getFollowers(followerIds, followingIds){
            const fol = {
                followers: followerIds,
                following: followingIds
            };
            return $http.post('/api/project/user/followers', fol);
        }
        function follow(currentUser, profileUser) {
            var id = {
                profileUser: profileUser
            };
            return $http.put("/api/project/user/follow/" + currentUser, id);
        }
        function getUsers(userIds) {
            return $http.post('/api/project/recipes/users', userIds);
        }
        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function loggedin(user) {
            return $http.get("/api/project/loggedin", user);
        }
        function logout(user) {
            return $http.post("/api/project/logout");
        }
        function register(user) {
            return $http.post("/api/project/register", user);
        }
        function findUserByUsername(username) {
            return $http.get("/api/project/user?username="+username);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/project/user/"+userId, newUser);
        }

        function findUserById(userId) {
            return $http.get("/api/project/user/"+userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username="+username+"&password="+password);
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }
        function deleteUser(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function likePage(recipeId, userId) {
            var id = {
                recipeId: recipeId
            };
            return $http.put("/api/project/user/like/"+ userId, id);
        }

    }
})();