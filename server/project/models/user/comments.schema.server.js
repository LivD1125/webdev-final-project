module.exports = function () {
    var mongoose = require('mongoose');

    var commentsSchema = mongoose.Schema({
        comment: String,
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectMongoUsers'},
        recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectMongoRecipes'}
    }, {collection: 'project.mongo.comments'});

    return commentsSchema;
};