module.exports = function (app) {
    app.get('/api/user/:userId/website', findAllWebsites);
    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);


    var websites = [
        { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
    ];

    function findAllWebsites(req, res) {
        var userId = req.params.userId;
        var sites = [];
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }

    function createWebsite(req, res) {
        var newWebsite = req.body;
        newWebsite["_id"] = websites.length + 1;
        var w = websites.push(newWebsite);
        res.json(newWebsite);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var ws = [];
        for(var w in websites) {
            if(userId === websites[w].userId) {
                ws.push(websites[w]);
            }
        }
        res.json(ws);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (w) {
            return w._id == websiteId;
        });
        res.json(website);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        for(var w in websites) {
            if( websites[w]._id === websiteId ) {
                websites[w].name = website.name;
                websites[w].update = new Date();
                websites[w].description = website.description;
                res.json(websites[w]);
                return;
            }
        }
    }

    function deleteWebsite(req, res) {
        var website = req.params.websiteId;
        var web = websites.find(function (w) {
            return w._id == websiteId;
        });
        websites.splice(web, 1);
        return res.json(web);
    }

};