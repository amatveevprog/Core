/**
 * Created by alexey.matveev on 13.10.2016.
 */

//проверка на то, является ли переменная новой
exports.checkHashVar = function()
{
    var response = arguments[arguments.length-1];
    response.end((process.env.REFRESH_HASH===arguments[0]).toString());
};