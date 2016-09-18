var fs=require('fs');
exports.get = function (req,res,next) {
    var fd = fs.readFileSync("./public/index.html",'utf-8');
    var mime = require('mime').lookup("./public/index.html");
    //console.log("mime-type: "+mime);
    res.setHeader("Content-Type",mime+"; charset=utf-8");
    res.end(fd);
    
    /*require('../async_core').getContentToSend("../public/index.html",res,function (err,content) {
        if(err)
        {
            return next(err);
        }
        else
        {
            res.end(content);
        }
    });*/
};