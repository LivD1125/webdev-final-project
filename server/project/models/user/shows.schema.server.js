module.exports = function () {
    var mongoose = require('mongoose');

    var showsSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        dateCreated: {type: Date, default: Date.now},
        likes: Number,
        Comments: [String],
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: 'project.mongo.shows'});

    return userSchema;
};