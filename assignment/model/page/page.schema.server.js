module.exports = function () {
    var mongoose = require('mongoose');

    var pageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentMongoWebsites'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentMongoWidgets'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'assignments.mongo.page'});

    return pageSchema;
};