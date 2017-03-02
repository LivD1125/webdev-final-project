(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            "createWidget": createWidget,
            "findWidgetByPageId": findWidgetByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "sortWidgetList": sortWidgetList
        };
        return api;

        function createWidget(pageId, widget) {
          return $http.post("/api/page/"+pageId+"/widget", widget);
        }
        function findWidgetByPageId(pageId) {
          return $http.get("/api/page/"+pageId+"/widget");
        }
        function findWidgetById(widgetId) {
           return $http.get("/api/widget/"+widgetId);
        }
        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId, widget);
        }
        function deleteWidget(widgetId) {
            return $http.del("/api/widget/"+widgetId);
        }
        function sortWidgetList(pageId, initial, final) {
            console.log('sortWidgetList');
            console.log("/api/page/"+pageId+"/widget?initial="+initial+"&final="+final);
            return $http.put("/api/page/"+pageId+"/widget?initial="+initial+"&final="+final);
        }
    }
})();