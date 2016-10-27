//получить только с именами и айдишниками.
function get_all_search_items() {
    var response = arguments[arguments.length-1];
    mongodb = require('mongodb');
    var items_array = [];
    var uri = 'mongodb://user:pass@host:port/db';
    var dbpassword = 'Lisa1234';
    var dbuser = 'teatimeshop_service';
    var url = 'mongodb://'+dbuser+':'+dbpassword+'@ds047315.mlab.com:47315/production';
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
        items.find({},{name:1,label:1}).toArray(function (err, docs)
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
exports.named_items = get_all_search_items;