module.exports = function(app) {
    require("./services/user.service.server.js")(app);
    require("./services/recipes.service.server.js")(app);
};