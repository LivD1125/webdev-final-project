module.exports = function () {
    var mongoose = require('mongoose');

    var recipesSchema = mongoose.Schema({
        uri: String,
        label: String,
        image: String,
        source: String,
        url: String,
        shareAs: String,
        dateCreated: {type: Date, default: Date.now},
        yield: Number,
        dietLabels: [String],
        healthLabels: [String],
        cautions: [String],
        ingredientLines: [String],
        calories: Number,
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProjectMongoComments'}],
        users: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProjectMongoUsers'}]
    }, {collection: 'project.mongo.recipes'});

    return recipesSchema;
};