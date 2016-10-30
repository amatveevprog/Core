var String1=["name","objectId","_id","label","picture","not_necessaary"];
function toDBObject(arr) {
    var rv = {};
    for(var i =0;i<arr.length;i++)
    {
        rv[arr[i]]=1;
    }
    return rv;
}
var obj = toDBObject(String1);
var arr2 = String1.slice(0,String1.length-1);
var obj2 = toDBObject(arr2);
console.log(obj);
console.log("_______");
var obj1 = {name:"Вася",label:"Пупкин",image_src:"http://1.jpg.com"};
var allowed=["name","label"];
for(var key in obj1)
{
    console.log(key);
    console.log(key.toString() in allowed);
    console.log("name" in allowed);
}


function isInAllowedArray(STR) {
    for(var i=0;i<allowed.length;i++)
    {
        if (allowed[i]===STR)
        {
            return true;
        }
    }
    return false;
}

console.log("******");
for(var key in obj1) {
    console.log(isInAllowedArray(key));
};