//в ответ на запрос отсылаем test.txt
var fs = require('fs');
exports.get = function(req,res,next)
{
    fs.readFile('./public/session/test.txt',function(err,data){
        if(err)
        {
            return next(err);
        }
        else
        {
            res.end(data);
        }
    });
}