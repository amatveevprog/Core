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