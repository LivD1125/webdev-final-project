module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server.js')();

    var userModel = mongoose.model('ProjectMongoUsers', userSchema);
    userModel.findUserById = findUserById;
    userModel.deleteUser = deleteUser;
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByFacebookId: findUserByFacebookId,
        likeRecipe: likeRecipe,
        getUsers: getUsers,
        follow: follow,
        addFollower: addFollower,
        getFollowers: getFollowers,
        getFollowing: getFollowing,
        getAllUsers: getAllUsers

    };
    return api;

    function getAllUsers() {
        var deferred = q.defer();
        userModel.find(function(err, users) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(users);
                deferred.resolve(users)
            }
        });
        return deferred.promise;
    }
    function getFollowers(followerIds) {
        var deferred = q.defer();
        userModel.find({ "_id" : { $in : followerIds } }, function(err, users) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(users);
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function getFollowing(followingIds) {
        var deferred = q.defer();
        userModel.find({ "_id" : { $in : followingIds } }, function(err, users) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function follow(userId, profileId) {
        console.log(profileId);
        var deferred = q.defer();
        userModel
            .update(
                {_id: userId},
                {$push: {"following": profileId}},
                function (err, status) {
                    console.log(err);
                    deferred.resolve(status);
                });
        return deferred.promise;
    }

    function addFollower(profileId, userId) {
        var deferred = q.defer();
        userModel
            .update(
                {_id: profileId},
                {$push: {"follower": userId}},
                function (err, status) {
                    console.log(err);
                    deferred.resolve(status);
                });
        return deferred.promise;
    }
    function getUsers(userIds) {
        var deferred = q.defer();
        userModel.find({ "_id" : { $in : userIds } }, function(err, users) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function likeRecipe(userId, recipeId) {
        var deferred = q.defer();
        userModel
            .update(
                {_id: userId},
                {$push: {"recipes": recipeId.recipeId}},
                function (err, status) {
                    console.log(err);
                    deferred.resolve(status);

                });
        return deferred.promise;
    }
    function findUserById(userId) {
        var deferred = q.defer();
        userModel
            .findById(userId, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});
    }

    function findUserByUsername(uname) {
        var deferred = q.defer();
        userModel.findOne({username: uname}, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(uname, pword) {
        var deferred = q.defer();
        userModel.findOne({username: uname, password: pword}, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        userModel
            .update(
                {_id: userId},
                {$set: {username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        aboutMe: user.aboutMe,
                        dateCreated: Date.now()}},
                function (err, status) {
                    deferred.resolve(status);
                });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId}, function (err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }


    function createUser(user) {
        var deferred = q.defer();
        userModel.create(user, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {

                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
};