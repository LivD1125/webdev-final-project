(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController)
        .controller("PageNewController", PageNewController)
        .controller("PageListController", PageListController);

    function PageEditController($routeParams, $location, PageService) {
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
            if (!page || !page.name) {
                vm.error = "page name is required";
                return;
            }
            PageService
                .updatePage(vm.pageId, page)
                .success(function(page) {
                vm.message = "Page Updated";
                $location.url("/user/"+userId+"/website/"+websiteId+"/page");
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
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page");
            }).error(function(err) {
                vm.error = "Error Deleting Page";
            });
        }
    }
    function PageNewController($routeParams, $location, PageService) {
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
            if (!page || !page.name) {
                vm.error = "page name is required";
                return;
            }
            PageService
                .createPage(websiteId, page)
                .success(function(page) {
                    vm.message = "New Page Created";
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page");
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
            vm.userId = userId;
            vm.websiteId = websiteId;
        }
        init();
    }
})();