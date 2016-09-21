var mongoose = require('../libs/mongoose'),Schema = mongoose.Schema;
var util = require('util');

var productcard_schema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rate:{
        type:Number
    },
    label:{
        type:String
    },
    //картинка на карточке
    image_src:{
        type:String
    },
    description:{
        type:String
    },
    categories:{
        type:Array
    },
    photos:{
        type:Array
    },
    variants:{
        type:Array
    },
    type:{
        type:String
    },
    created:{
        type:Date,
        default:Date.now
    }
});

exports.product = mongoose.model('productcard',productcard_schema);
var product = mongoose.model('productcard',productcard_schema)
//TODO потом убрать!!!!
exports.turnOff = function () {
    mongoose.disconnect();
}
var turnOff = function () {
    mongoose.disconnect();
}

var teaCard = mongoose.model('productcard',productcard_schema);
var prod1 = new teaCard( {
    name: "ШАЙ ВАЙ МАЙ",
price: 400,
rate: 4.5,
label: "Мао Фен Ы",
    image_src: "https://encryptedtbn3.gstatic.com/images?q=tbn:ANd9GcRwEw7rdsvRCmkRdh5O8iBcZaczS4FJhjwhZUgLwpJ7asBYE4Lu" ,
description:"Сюда описание, заголовки выделять <h4> Какойтозаголовок </h4>",
categories: [
"category_green",
    "category_india",
    "category_green"],
photos: [
    "http://www.playcast.ru/uploads/2015/12/15/16339360.jpg",
    "http://www.playcast.ru/uploads/2015/12/15/16339360.jpg"
],
variants:[
{
    "name": "100",
    "coefficient": 1
},
{
    "name": "250",
    "coefficient": 2.5
},
{
    "name": "500",
    "coefficient": 5
}
],
type: "tea" });
/*
prod1.save(function(err,affected){
    if(err){turnOff();throw(err)}
else{
        console.log(affected);
        turnOff();
    }});
*/

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
