var fs = require('fs');
exports.get = function(req,res,next){
    fs.readFile('./public/session/index.html',function (err,result) {
        if(err) {
            console.log('Ошибка чтения файла');
            return next(err);
        }
        var mime = require('mime').lookup("./public/session/index.html");
        //console.log("mime-type: "+mime);
        res.setHeader("Content-Type",mime+"; charset=utf-8");
        res.end(result);
    });
}