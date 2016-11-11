var config = require('../config');
var regexp = new RegExp(".*"+config.get('api_api_prefix')+".*");
module.exports = function(app)
{
    app.post("/upload",require('./upload').post);
    app.post(regexp,require('./api_post').post);
    app.get("/",require('./upload_route').get);
    app.get(regexp,require('./api').get);
    app.get("/functions",require('./functions').get);
    app.get("/somepage",require('./somepage').get);
    app.get("/catalog",require('./catalog').get);
    app.get("/catalog_experimental",require('./catalog_experimental').get);
    app.get("/session",require('./session').get);
    app.get("/specialpage",require('./specialpage').get);
    app.get("/search",require('./search').get);
    app.get("/search2",require('./search2').get);
    app.get("/search3",require('./search3').get);
}
