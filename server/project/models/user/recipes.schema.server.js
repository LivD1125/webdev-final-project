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
        likes: Number,
        yield: Number,
        dietLabels: [String],
        healthLabels: [String],
        cautions: [String],
        ingredientLines: [String],
        calories: Number,
        Comments: [String]
    }, {collection: 'project.mongo.recipes'});

    return recipesSchema;
};