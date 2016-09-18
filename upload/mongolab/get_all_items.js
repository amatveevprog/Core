//модель
//var productCard = require(process.cwd()+'/models/productCard').product;
//var turnOff = require(process.cwd()+'/models/productCard').turnOff;
/*exports.get_all_items = function () {
    return productCard.find().toArray(function(err,data){
        if(err) {
            return err;
            //TODO потом убрать
            turnOff();
        }
        else
            return(data);
    });
}*/








mongodb = require('mongodb');

exports.get_all_items = function () {
    var items_array = [];
    //var uri = 'mongodb://user:pass@host:port/db';
    var dbpassword = 'Lisa1234';
    var dbuser = 'teatimeshop_service';
    var url = 'mongodb://'+dbuser+':'+dbpassword+'@ds047315.mlab.com:47315/production';

    mongodb.MongoClient.connect(url, function(err, db)
    {
        if(err)
        {
            console.log('error at mongo connection / Mongo authorization error: =  ', err);
            throw err;
        }

        var items = db.collection('items');
        items.find().toArray(function (err, docs)
        {
            if(err)
            {
                console.log('error at mongo / data receive error: =  ', err);
                throw err;
            }

            docs.forEach(function (doc)
            {
                items_array.push(doc);
            });
            var json_item = {"items":items_array};
            var json = JSON.stringify(json_item);
            var jsonString = "ololo "+json;
            console.log('> Sending result to client.... | result = ' + json);
            return jsonString;
            //response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
            //response.write(json);
            //response.end();
        });


    });
}

//console.log(get_all_items());









/*var get_all_items1 = function () {
    var result = null;
    return productCard.find(function(err,data){
        if(err) {
            turnOff();
            //return get(err);
    return err;
            //TODO потом убрать

        }
        else
            result=data;
           // return get(result);
        return result;
    });
}*/
/*var get = function (data) {
    return data;
}*/
//var g = get_all_items1();
//console.log(g);

