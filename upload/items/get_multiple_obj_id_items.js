//получить только с именами и айдишниками.
function get_items() {
    var response = arguments[arguments.length-1];
    var mongodb = require('mongodb');
    var ObjectId_ = require('mongodb').ObjectId;
    var items_array = [];
    var uri = 'mongodb://user:pass@host:port/db';
    var dbpassword = 'Lisa1234';
    var dbuser = 'teatimeshop_service';
    var url = 'mongodb://'+dbuser+':'+dbpassword+'@ds047315.mlab.com:47315/production';

    //making an array of object ids
    var size = arguments.length-1;//размер равен количеству аргументов минус объект response, который в конце...
    var array_of_oIDs=[];
    for(var i=0;i<size;i++)
    {
        array_of_oIDs.push(ObjectId_(arguments[i]));
    }
    mongodb.MongoClient.connect(url, function(err, db)
    {
        if(err)
        {
            console.log('error at mongo connection / Mongo authorization error: =  ', err);
            console.log('Error!' + err.toString() +' ');
            response.setHeader('Content-Type', 'text/html; charset=UTF-8');
            response.end(err.toString());
            throw err;
        }
        var items = db.collection('items');
        //
        // console.log(ObjectId_(oid));

        items.find({_id:{$in:array_of_oIDs}}).toArray(function (err, docs)
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
exports.o_id = get_items;