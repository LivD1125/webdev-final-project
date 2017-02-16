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
        var websites = PageService.findPageByWebsiteId(websiteId);

        //event handler
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            var page = PageService.findPageById(pageId);
            vm.page = page;
            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.pageId = pageId;
        }
        init();

        function updatePage(page) {
            PageService.updatePage(vm.pageId, page);
            alert("Page Updated!");
        }
        function deletePage() {
            PageService.deletePage(vm.pageId);
            alert("Page Deleted!");
        }

    }
    function PageNewController($routeParams, PageService) {
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        var pages = PageService.findPageByWebsiteId(websiteId);
        var vm = this;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.createPage = createPage;

        function createPage(page) {
            PageService.createPage(page);
            alert("New Page Created!");
        }
    }
    function PageListController($routeParams, PageService) {
        var websiteId = $routeParams.wid;
        var userId = $routeParams.uid;
        var pages = PageService.findPageByWebsiteId(websiteId);
        var vm = this;
        vm.pages = pages;
        vm.userId = userId;
        vm.websiteId = websiteId;
    }
})();