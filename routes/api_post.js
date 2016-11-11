var asyncRouter = require('../async_core');
//лучше использовать не asyncRouter, а индекс внутри async.core!
var HttpError = require('../errors').HttpError;
exports.post = function(req,res,next){
    //проверка на корректный урл
    asyncRouter.executeJSONFunction(req,res,function(err,result){
        if(err)
        {
            return next(err);
        }
        else
        {
            console.log("api post executed!!!");

            //res.end("result: "+JSON.stringify(result));
        }
    });
    //console.log(req.url);
    //res.end(JSON.stringify(req.url));
}