var mongoose = require('../libs/mongoose'),Schema = mongoose.Schema;
var util = require('util');

var productcard_schema = new Schema({
    name:{
        type:String,
        required:true
    },
    imgsrc:{
        type:String,
        unique:false,
        required:false
    },
    price:{
        type:Number,
        required:true,
    },
    created:{
        type:Date,
        default:Date.now
    }
});

exports.product = mongoose.model('productCard',productcard_schema);

//TODO потом убрать!!!!
exports.turnOff = function () {
    mongoose.disconnect();
}


//вставка в БД
/*
var teaCard = mongoose.model('productCard',productcard_schema);
var prod1 = new teaCard({name:"Вася-чай",imgsrc:"http://jf.kf/1.jpg",price:222100});
var prod2 = new teaCard({name:"Петя-чай",imgsrc:"http://jf.kf/2.jpg",price:555200});
var prod3 = new teaCard({name:"Эзкобар-чифир",imgsrc:"http://jf.kf/3.jpg",price:200021});
prod1.save(function(err){
 if(err)throw(err);});
prod2.save(function(err){
    if(err)throw(err);});
prod3.save(function(err){
    if(err){
        mongoose.disconnect();
         throw(err);
    }
    mongoose.disconnect();
});
*/
//Извлечение из БД

/*var teaCard = mongoose.model('productCard',productcard_schema);
teaCard.find(function (err,data) {
    if(err) {
        mongoose.disconnect();
        throw err;
    }
    console.log(typeof data);
    data.forEach(function(cur){
        console.log(cur);
    });
    //console.log(JSON.stringify(data));
    mongoose.disconnect();
});*/
//console.log(process.cwd());//для того, чтобы узнать базовую директорию проекта

// var teaCard = new productcard_schema({imgsrc:"http://jf.kf/1.jpg",price:100});
// var teaCard2 = new productcard_schema({imgsrc:"http://jf.kf/2.jpg",price:200});
// var teaCard3 = new productcard_schema({imgsrc:"http://jf.kf/3.jpg",price:300});
// teaCard.save(function(err){
//     if(err)throw(err);
// });
// teaCard2.save(function(err){
//     if(err)throw(err);
// });
// teaCard3.save(function(err){
//     if(err){
//         mongoose.disconnect();
//         throw(err);
//     }
//     mongoose.disconnect();
// });
