var fs = require('fs');
exports.get = function(req,res,next){
    fs.readFile('../public/session/index.html',function (err,result) {
        if(err) {
            return next(err);
        }
        res.end(result);
    });
}