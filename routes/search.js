/**
 * Created by alexey.matveev on 25.10.2016.
 */
var fs=require('fs');
exports.get = function (req,res,next) {
    var fd = fs.readFileSync("./public/shop_front_experimental/search/index.html",'utf-8');
    var mime = require('mime').lookup("./public/shop_front_experimental/search/index.html");
    res.setHeader("Content-Type",mime+"; charset=utf-8");
    res.end(fd);
};