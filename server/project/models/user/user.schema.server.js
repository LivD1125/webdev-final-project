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
        likedShows: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProjectMongoShows'}],
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: 'project.mongo.user'});

    return userSchema;
};