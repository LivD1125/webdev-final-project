module.exports = function () {
    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        dateCreated: {type: Date, default: Date.now},
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProjectMongoUser'}],
        follower: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProjectMongoUser'}],
        recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProjectMongoRecipes'}],
        facebook: {
            id:    String,
            token: String
        },
        aboutMe: String
    }, {collection: 'project.mongo.user'});

    return userSchema;
};