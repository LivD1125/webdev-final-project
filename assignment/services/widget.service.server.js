module.exports = function (app) {
    // var multer = require('multer'); // npm install multer --save
    // var upload = multer({ dest: 'services'+'/../../public/uploads' });
    var model = require('../model/widget/widget.model.server')();

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.put("/api/page/:pageId/widget*", sortWidgets);
    // app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function sortWidgets(req, res) {
        console.log('request');
        var pageId = req.params.pageId;
        var initial = req.query.initial;
        var final = req.query.final;
        model
            .reorderWidgets(pageId, initial, final).then(function(widgets) {
                res.json(widgets);
        });
    }

    function createWidget(req, res) {
        model
            .createWidget(req.params.pageId, req.body)
            .then(function (widget) {
                res.json(widget);
            });
    }

    function findAllWidgetsForPage(req, res) {
        model
            .findAllWidgetsForPage(req.params.pageId)
            .then(function (widgets) {
                res.json(widgets);
            });
    }

    function findWidgetById(req, res) {
        model
            .findWidgetById(req.params.widgetId)
            .then(function (widget) {
                res.json(widget);
            });
    }

    function updateWidget(req, res) {
        model
            .updateWidget(req.params.widgetId, req.body)
            .then(function (status) {
                res.json(status);
            });
    }

    function deleteWidget(req, res) {
        model
            .deleteWidget(req.params.widgetId)
            .then(function (status) {
                res.json(status);
            });
    }
    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        model.findWidgetById(widgetId).then(function(widget) {
            widget.url = '/uploads/'+filename;
            model.updateWidget(widgetId, widget).then(function(status) {
                res.json(status);
            });
        });
        var callbackUrl   = "/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId;

        res.redirect(callbackUrl);
    }
};