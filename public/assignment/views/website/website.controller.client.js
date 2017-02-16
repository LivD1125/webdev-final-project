(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)
        .controller("WebsiteNewController", WebsiteNewController)
        .controller("WebsiteListController", WebSiteListController);

    function WebsiteEditController($routeParams, WebsiteService) {
        console.log('edit controller');
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var websites = WebsiteService.findWebsitesByUser(userId);

        var vm = this;
        vm.websites = websites;
        vm.userId = userId;
        vm.website = WebsiteService.findWebsiteById(websiteId);
        // event handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        function init() {
            var website = WebsiteService.findWebsiteById(websiteId);
            vm.website = website;
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.website);
        }
    }

    function WebsiteNewController($routeParams, WebsiteService) {
        var userId = $routeParams['uid'];
        var websites = WebsiteService.findWebsitesByUser(userId);

        var userId = $routeParams.uid;
        var vm = this;
        vm.websites = websites;
        vm.userId = userId;
        // event handler
        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            WebsiteService.createWebsite(website);
        }
    }
    function WebSiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["uid"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
            vm.userId = userId;
        }
        init();
    }
})();