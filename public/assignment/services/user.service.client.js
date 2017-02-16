(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserByUsername": findUserByUsername,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "updateUser": updateUser
        };
        return api;

        function updateUser(userId, newUser) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return users[u];
                }
            }
            return null;
        }

        function findUserById(userId) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return users[u];
                }
            }
            return null;
        }
        function findUserByUsername(username) {
            for(var u in users) {
                if (users[u].username == username) {
                    return users[u];
                }
            }
            return null;
        }
        function createUser(user) {
            user["_id"] = users.length + 1;
            var u = users.push(user);
            return angular.copy(users[u - 1]);
        }
        function deleteUser(userId) {
            var del = null;
            for (var u in users) {
                if (users[u]._id == userId) {
                    del = users[u];
                    break;
                }
            }
            if (del != null) {
                users.splice(del, 1);
                return del;
            }
            return null;
        }

    }
})();