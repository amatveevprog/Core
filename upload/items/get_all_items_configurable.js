//get all the items of database with fields that are set in get request

function all() {
    function toDBObject(arr) {
        var rv = {};
        for(var i =0;i<arr.length;i++)
        {
            rv[arr[i]]=1;
        }
        return rv;
    }
    var response = arguments[arguments.length-1];
    mongodb = require('mongodb');
    var items_array = [];
    var uri = 'mongodb://user:pass@host:port/db';
    var dbpassword = 'Lisa1234';
    var dbuser = 'teatimeshop_service';
    var url = 'mongodb://'+dbuser+':'+dbpassword+'@ds047315.mlab.com:47315/production';
    //
    var size = arguments.length-1;//размер равен количеству аргументов минус объект response, который в конце...
    var queryToDbObject={};
    for(var i=0;i<size;i++)
    {
        queryToDbObject[arguments[i]]=1;
    }
    mongodb.MongoClient.connect(url, function(err, db)
    {
        if(err)
        {
            console.log('error at mongo connection / Mongo authorization error: =  ', err);
            console.log('Error!' + err.toString() +' ');
            response.setHeader('Content-Type', 'text/html; charset=UTF-8');
            response.end(err.toString())
            throw err;
        }

        var items = db.collection('items');
        items.find({},queryToDbObject).toArray(function (err, docs)
        {
            if(err)
            {
                console.log('error at mongo / data receive error: =  ', err);

                response.setHeader('Content-Type', 'text/html; charset=UTF-8');
                response.end(err.toString());
            }

            docs.forEach(function (doc)
            {
                items_array.push(doc);
            });
            var items_size = items_array.length;
            var json_item = {"items":items_array};
            var json = JSON.stringify(json_item);

            //console.log('\r\n SIZE of sent items: '+items_size);
            response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
            response.write(json);
            response.end();
        });


    });
}
exports.all = all;