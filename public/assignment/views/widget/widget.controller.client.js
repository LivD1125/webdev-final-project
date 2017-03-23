(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("WidgetEditController", WidgetEditController)
        .controller("WidgetNewController", WidgetNewController)
        .controller("WidgetNewHeadingController", WidgetNewHeadingController)
        .controller("WidgetNewYoutubeController", WidgetNewYoutubeController)
        .controller("WidgetNewImageController", WidgetNewImageController)
        .controller("WidgetNewHtmlController", WidgetNewHtmlController);

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
    function WidgetEditController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.deleteWidget = deleteWidget;
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
            WidgetService.updateWidget(vm.widgetId, widget).success(function(widget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            });


        }
        function getEditUrl(widgetType) {
            return 'widget-'+widgetType+'-editor.view.client.html';
        }
        function deleteWidget() {
            console.log('delete');
            WidgetService.deleteWidget(vm.widgetId).success(function(widget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            });
        }

    }

    function WidgetNewController($sce, $routeParams, $location, WidgetService) {
        var vm = this;
        vm.doYouTrustUrl = doYouTrustUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        // use this
        vm.createWid = createWid;
        function init() {
            WidgetService.findWidgetByPageId(vm.pageId).success(function(widgets) {
                vm.widgets = widgets;
            });
        }

        function createWid(type) {
            if (type==="HEADER") {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new/heading");
            } else if (type==="YOUTUBE") {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new/youtube");
            } else if (type==="IMAGE") {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new/image");

            }

        }

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }
    }

    function WidgetNewHeadingController($routeParams, $location, WidgetService) {
        console.log("HERE");
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.type = "HEADER";
        vm.createWidget = createWidget;

        function createWidget(widget) {
            widget.type = "HEADER";
            WidgetService.createWidget(vm.pageId, widget).success(function(widg) {
                vm.message = "Widget Created";
                $location.url("/user/"+vm.userId+"/website/page/"+vm.pageId+"/widget");
            });
        }
    }

    function WidgetNewImageController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.createWidget = createWidget;

        function createWidget(widget) {
            widget.type = "IMAGE";
            WidgetService.createWidget(vm.pageId, widget).success(function(widg) {
                vm.message = "Widget Created";
                $location.url("/user/"+vm.userId+"/website/page/"+vm.pageId+"/widget/");
            });
        }
    }
    function WidgetNewYoutubeController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.createWidget = createWidget;

        function createWidget(widget) {
            widget.type = "YOUTUBE";
            WidgetService.createWidget(vm.pageId, widget).success(function(widg) {
                vm.message = "Widget Created";
                $location.url("/user/"+vm.userId+"/website/page/"+vm.pageId+"/widget/");
            });
        }
    }
    function WidgetNewHtmlController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.createWidget = createWidget;

        function createWidget(widget) {
            widget.type = "HTML";
            WidgetService.createWidget(vm.pageId, widget).success(function(widg) {
                vm.message = "Widget Created";
                $location.url("/user/"+vm.userId+"/website/page/"+vm.pageId+"/widget/");
            });
        }

    }
})();