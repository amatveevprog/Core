var events = require('events');
var eventEmitter = new events.EventEmitter();
/*function register(event,callback){
    //eventEmitter.once(event,callback);
    eventEmitter.prependOnceListener(event,callback);
};
function emitEvent(event,info)
{
    eventEmitter.emit(event,info);
    //eventEmitter.removeAllListeners(event);
};
function remove(event)
{
    eventEmitter.removeAllListeners(event);
}
module.exports = {register:register,emit:emitEvent,remove:remove}*/

exports.ActionEmitter = function()
{
    this.eventEmitter = new events.EventEmitter();
}
exports.ActionEmitter.prototype.registerEvent = function(event,callback)
{
    //eventEmitter.prependOnceListener(event,callback);
    eventEmitter.once(event,callback);
}
exports.ActionEmitter.prototype.emitEvent = function(event,content)
{
    eventEmitter.emit(event,content);
}
exports.ActionEmitter.prototype.finalize = function () {
    delete this;
}

//register("done module1",function(result){console.log(result+" has been sent to client...")});
//register("done module2",function(result){console.log(result+" has been sent to client...")});
