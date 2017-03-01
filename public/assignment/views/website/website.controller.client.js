(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)
        .controller("WebsiteNewController", WebsiteNewController)
        .controller("WebsiteListController", WebSiteListController);

    function WebsiteEditController($routeParams, WebsiteService) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var vm = this;
        // event handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        function init() {
            WebsiteService.findWebsiteById(websiteId).success(function(website){
                vm.website = website;
            });
            WebsiteService.findWebsitesByUser(userId).success(function(websites) {
                vm.websites = websites;
            });
            vm.userId = userId;

        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website).success(function(website) {
                vm.message = "Website Updated";
            });
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.website).success(function(website) {
                vm.message("Delete Website Successful");
            });
        }
    }

    function WebsiteNewController($routeParams, WebsiteService) {
        var userId = $routeParams.uid;
        var vm = this;
        // event handler
        vm.createWebsite = createWebsite;
        function init() {
            WebsiteService.findWebsitesByUser(userId).success(function(websites) {
                vm.websites = websites;
            });
            vm.userId = userId;
        }
        init();
        function createWebsite(website) {
            WebsiteService.createWebsite(website).success(function(website) {
                vm.message = "Website Created";
            });
        }
    }
    function WebSiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["uid"];
        function init() {
            WebsiteService.findWebsitesByUser(userId).success(function(websites) {
                vm.websites = websites;
            });
            vm.userId = userId;
        }
        init();
    }
})();