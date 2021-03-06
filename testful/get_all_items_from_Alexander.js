

mongodb = require('mongodb');

//return catalog items

function get_all_items(response)
{
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

            console.log('> Sending result to client.... | result = ' + json);
            response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
            response.write(json);
            response.end();
        });


    });


}






exports.get_all_items = get_all_items;