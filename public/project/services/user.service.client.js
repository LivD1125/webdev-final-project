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
            "register": register
        };
        return api;

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

    }
})();