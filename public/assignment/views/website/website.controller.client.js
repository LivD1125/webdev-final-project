(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)
        .controller("WebsiteNewController", WebsiteNewController)
        .controller("WebsiteListController", WebSiteListController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
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
            if (!website || !website.name) {
                vm.error = "Website Name is Required";
                return;
            }
            WebsiteService.updateWebsite(websiteId, website).success(function(website) {
                vm.message = "Website Updated";
                $location.url("/user/"+userId+"/website");
            });
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(websiteId).success(function(website) {
                vm.message = "Delete Website Successful";
                $location.url("/user/"+userId+"/website");
            });
        }
    }

    function WebsiteNewController($routeParams, $location, WebsiteService) {
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
            if (!website || !website.name) {
                vm.error = "Website Name is Required";
                return;
            }
            WebsiteService.createWebsite(website, userId).success(function(website) {
                vm.message = "Website Created";
                $location.url("/user/"+userId+"/website");
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