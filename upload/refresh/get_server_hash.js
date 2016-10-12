/**
 * Created by alexey.matveev on 13.10.2016.
 */

exports.getHashVar = function()
{
    var response = arguments[arguments.length-1];
    response.end(process.env.REFRESH_HASH);
};
