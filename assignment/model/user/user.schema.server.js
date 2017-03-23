module.exports = function () {
    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentMongoWebsites'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'assignments.mongo.user'});

    return userSchema;
};