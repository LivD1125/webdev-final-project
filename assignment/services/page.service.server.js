module.exports = function (app) {
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem Ipsum" }
    ];
    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;
        newPage["_id"] = pages.length + 1;
        newPage["websiteId"] = websiteId;
        pages.push(newPage);
        res.json(newPage);
    }
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var pags = [];
        for(var p in pages) {
            if(websiteId === pages[p].websiteId) {
                pags.push(pages[p]);
            }
        }
        res.json(pags);
    }
    function findPageById(req, res) {
        var pageId = req.params.pageId;
        var page = pages.find(function (p) {
            return p._id == pageId;
        });
        res.json(page);
    }
    function updatePage(req, res) {
        var pageId = req.params.pageId
        var page = req.body;
        for(var p in pages) {
            if( pages[p]._id === pageId ) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.json(pages[p]);
                return;
            }
        }
    }

    function deletePage(req, res) {
        var page = req.params.pageId;
        var pag = pages.find(function (p) {
            return p._id == pageId;
        });
        pages.splice(pag, 1);
        res.json(pag);
    }
};