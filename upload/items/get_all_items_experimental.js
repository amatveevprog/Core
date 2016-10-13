/**
 * Created by alexander.bondarik on 29.09.2016.
 */
exports.get_all_items_int = get_all_items;






/**
 * Created by alexander.bondarik on 22.09.2016.
 */


//return catalog items
function get_all_items(response)
{

    mongodb = require('mongodb');
    var items_array = [];
    var uri = 'mongodb://user:pass@host:port/db';
    var dbpassword = 'Lisa1234';
    var dbuser = 'teatimeshop_service';
    var url = 'mongodb://'+dbuser+':'+dbpassword+'@ds047315.mlab.com:47315/production';
    //var url = 'mongodb://amatveev_prog:1q2w4r7u9o0p@ds147965.mlab.com:47965/teatimeshop';
    console.log(url);
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

        var items = db.collection('items_test2');
        //var items = db.collection('productcards');
        items.find().toArray(function (err, docs)
        {
            if(err)
            {
                console.log('error at mongo / data receive error: =  ', err);

                response.setHeader('Content-Type', 'text/html; charset=UTF-8');
                response.end(err.toString())
            }

            docs.forEach(function (doc)
            {
                items_array.push(doc);
            });
            var json_item = {"items":items_array};
            var json = JSON.stringify(json_item);

            //console.log('> Sending result to client.... | result = ' + json);
            response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
            response.write(json);
            response.end();
        });


    });


}
