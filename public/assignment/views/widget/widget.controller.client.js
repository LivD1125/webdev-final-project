(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("WidgetEditController", WidgetEditController)
        .controller("WidgetNewController", WidgetNewController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.doYouTrustUrl = doYouTrustUrl;
        WidgetService.findWidgetByPageId(vm.pageId).success(function(widgets) {
            vm.widgets = widgets;
        });
        var startIndex = -1;
        var endIndex = -1;
        $('#widget-list')
            .sortable({
                axis: "y",
                start: function (event, ui) {
                    startIndex = ui.item.index();
                },
                stop: function (event, ui) {
                    endIndex = ui.item.index();
                    console.log([startIndex, endIndex]);
                    WidgetService.sortWidgetList(vm.pageId, startIndex, endIndex).success(function(widgets) {
                        vm.widgets = widgets;
                    });
                }
            });
        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }
    }
    function WidgetEditController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;


        function init() {
            WidgetService.findWidgetById(vm.widgetId).success(function(widget) {
                vm.widget = widget;
            });
            WidgetService.findWidgetByPageId(vm.pageId).success(function(widgets) {
                vm.widgets = widgets;
            });
            vm.getEditUrl = getEditUrl;
        }
        init();

        function updateWidget() {
            WidgetService.updateWidget(vm.widgetId).success(function(widget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            });


        }
        function getEditUrl(widgetType) {
            return 'widget-'+widgetType+'-editor.view.client.html';
        }
        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId).success(function(widget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            });
        }

    }

    function WidgetNewController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.doYouTrustUrl = doYouTrustUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            WidgetService.findWidgetByPageId(vm.pageId).success(function(widgets) {
                vm.widgets = widgets;
            });
        }
        vm.widgets =

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }
    }
})();