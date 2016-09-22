
var productCard = require(process.cwd()+'/models/productCard').product;
var turnOff = require(process.cwd()+'/models/productCard').turnOff;


exports.get_all_items = function () {
    var response = arguments[arguments.length-1];
    productCard.find(function(err,data){
        if(err) {
            console.log('Error!' + err.toString());
            turnOff();

            //TODO потом убрать
        }
        else
        {
            //set headers
            //console.log(JSON.stringify(data));
            response.setHeader('Content-Type', 'application/json; charset=UTF-8');
            response.setHeader('Transfer-Encoding', 'chunked');
            //response.setHeader("Content-Type:", "application/json"+";charset=utf-8");
            response.end(JSON.stringify(data));
            turnOff();
        }
    });
}




