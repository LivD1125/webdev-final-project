(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem Ipsum" }
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;


        function createPage(websiteId, page) {
            p = page;
            p.websiteId = websiteId;
            pages.push(p);
            return p;
        }
        function findPageByWebsiteId(websiteId) {
            var pags = [];
            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    pags.push(pages[p]);
                }
            }
            return angular.copy(pags);
        }
        function findPageById(pageId) {
            for(var p in pages) {
                if(pageId === pages[p]._id) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }
        function updatePage(pageId, page) {
            for(var p in pages) {
                if( pages[p]._id === pageId ) {
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return angular.copy(pages[p]);
                }
            }
            return null;

        }
        function deletePage(pageId) {
            var del = null;
            for (var p in pages) {
                if (pageId === pages[p]._id) {
                    del = pages[p];
                    break;
                }
            }
            if (del != null) {
                pages.splice(del, 1);
                return angular.copy(del);
            }
            return null;
        }
    }
})();