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
        recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProjectMongoRecipes'}],
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: 'project.mongo.user'});

    return userSchema;
};