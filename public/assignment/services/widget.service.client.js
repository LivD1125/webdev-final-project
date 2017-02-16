(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            "createWidget": createWidget,
            "findWidgetByPageId": findWidgetByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            w = widget;
            w.pageId = pageId;
            widgets.push(w);
            return angular.copy(w);

        }
        function findWidgetByPageId(pageId) {
            var widg = []
            for(var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    widg.push(widgets[w]);
                }
            }
            return angular.copy(widg);
        }
        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgetId === widgets[w]._id) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }
        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                if( widgets[w]._id === pageId ) {
                    if (widgets[w].widgetType === 'HTML' ) {
                        widgets[w].text = widget.text;
                        return angular.copy(widgets[w]);
                    } else if (widgets[w].widgetType === 'YOUTUBE' || widgets[w].widgetType === 'IMAGE') {
                        widgets[w].width = widget.width;
                        widgets[w].url = widget.url;
                        return angular.copy(widgets[w]);
                    } else if (widgets[w].widgetType === 'HEADER') {
                        widgets[w].size = widget.size;
                        widgets[w].text = widget.text;
                        return angular.copy(widgets[w]);
                    }
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            var del = null;
            for (var w in widgets) {
                if (widgetId === widgets[w]._id) {
                    del = widgets[w];
                    break;
                }
            }
            if (del != null) {
                widgets.splice(del, 1);
                return angular.copy(del);
            }
            return null;
        }
    }
})();