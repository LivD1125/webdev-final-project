module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var widgetSchema = require('./widget.schema.server.js')();
    var widgetModel = mongoose.model('AssignmentMongoWidgets', widgetSchema);
    var api = {
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        findAllWidgetsForPage: findAllWidgetsForPage,
        deleteWidget: deleteWidget,
        updateWidget: updateWidget,
        reorderWidgets: reorderWidgets
    };
    return api;


    function findWidgetById(widgetId) {
        var deferred = q.defer();
        widgetModel
            .findById(widgetId, function (err, widget) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();
        widgetModel
            .find({_page: pageId}, function (err, widgets) {
                deferred.resolve(widgets);
            });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        widgetModel
            .update(
                {_id: widgetId},
                {$set: {name: widget.name,
                    text: widget.text,
                    url: widget.url,
                    width: widget.width,
                    height: widget.height,
                    size: widget.size,
                    description: widget.description,
                    dateCreated: Date.now()}},
                function (err, status) {
                    deferred.resolve(status);
                });
        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        widgetModel.remove({_id: widgetId}, function (err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function createWidget(pageId, widget) {
        var deferred = q.defer();
        widget._page = pageId;
        widgetModel.create(widget, function(err, widg) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(widg);
            }
        });
        return deferred.promise;
    }

    function reorderWidgets(pageId, initial, final) {
        var deferred = q.defer();
        findAllWidgetsForPage(pageId).then(function(widgets) {
            widgets.splice(final, 0, widgets[initial]);
            widgets.splice(initial, 1);
            console.log(widgets);
            widgets.save(function(err, widg) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(widg);
                }
            });
        });

        return deferred.promise;
    }
};