(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController)
        .controller("PageNewController", PageNewController)
        .controller("PageListController", PageListController);

    function PageEditController($routeParams, PageService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        //event handler
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageById(pageId)
                .success(function(page) {
                    vm.page = page;
            });
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function(pages) {
                    vm.pages = pages;
            });
            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.pageId = pageId;
        }
        init();

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .success(function(page) {
                vm.message = "Page Updated";
                })
                .error(function(err) {
                vm.error = "error updating page";
                });
        }
        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .success(function(page) {
                vm.message = "Page Deleted!";
            }).error(function(err) {
                vm.error = "Error Deleting Page";
            });
        }

    }
    function PageNewController($routeParams, PageService) {
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        var vm = this;
        //event handlers
        vm.createPage = createPage;
        function init() {
            PageService.findPageByWebsiteId(websiteId).success(function(pages) {
                vm.pages = pages;
            });
            vm.websiteId = websiteId;
            vm.userId = userId;
        }
        init();

        function createPage(page) {
            PageService
                .createPage(page)
                .success(function(page) {
                vm.message = "New Page Created";
                })
                .error(function(err) {
                    vm.error = "error creating page";
                });
        }
    }

    function PageListController($routeParams, PageService) {
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        var vm = this;
        function init() {
            PageService.findPageByWebsiteId(websiteId).success(function(pages) {
                vm.pages = pages;
            });
            vm.pages = pages;
            vm.userId = userId;
            vm.websiteId = websiteId;
        }
        init();
    }
})();