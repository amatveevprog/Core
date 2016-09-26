console.log("sdfsdfasfsfsaf");
function run()
{
    try
    {
        return 'localStorage' in window && window['localStorage']!== null;
    }
    catch(e)
    {
        return false;
    }
}

function saveStorageData(string_data) {
    if((window.localStorage['StorageData']!=null)&&(window.localStorage['StorageData']!='undefined'))
    {
        //удаляем предыдущую StorageData перед добавлением
        //случай, когда в браузере есть данные о предыдущем заходе
        window.localStorage.removeItem('StorageData');
        console.log("Вы уже здесь были!!!");
    }
    window.localStorage['StorageData'] = string_data;
}
function saveJSONStorageData(json_data){
    if((window.localStorage['StorageJSONData']!=null)&&(window.localStorage['StorageJSONData']!='undefined'))
    {
        //удаляем предыдущую StorageData перед добавлением
        //случай, когда в браузере есть данные о предыдущем заходе
        window.localStorage.removeItem('StorageJSONData');
    }
    window.localStorage['StorageJSONData'] = JSON.stringify(json_data);
}
/*function register()
 {
 window.onload = function () {
 if((window.localStorage['StorageData']!=null)&&(window.localStorage['StorageData']!='undefined')) {
 }
 loadStorageData();
 }
 }
 window.onunload = function () {
 saveStorageData(fs.readFileSync('test.txt').toString());
 }
 }*/
function loadStorageData() {
    var object = getStorageData();
    if((object.html!=null)&&(object.html!='undefined')) {
        window.document.write(window.localStorage['StorageData']);
    }
}
function getStorageData(urlPath,callback)
{
    var obj={html:null,json:null};
    //obj.html = window.localStorage['StorageData'];
    var XHR = new XMLHttpRequest();
    XHR.onload = XHR.onerror = function () {
        if(this.status==200)
        {
            window.document.textContent=XHR.responseText;
            saveStorageData(XHR.responseText);
            obj.json = window.localStorage['StorageJSONData'];
            obj.html = window.localStorage['StorageData'];
            callback(null,obj);
        }
        else
        {
            console.log("error: "+ this.status);
        }
    }
    XHR.open("GET",urlPath,true);
    XHR.send();
    /*XHR.onreadystatechange = function () {
 if(XHR.readyState!=4)
 {
 return;
 }
 if(XHR.status!=200)
 {
 alert(XHR.status+":"+XHR.statusText);
 }
 else
 {
 document.textContent=XHR.responseText;
 }
 }*/

}
//функция отправки
function saveHtmlSnapShot()
{
    var htmlString = window.document.body;
    saveStorageData(htmlString);
}
function checkIfIwasHere()
{
    try
    {
        return 'StorageData' in window.localStorage && window.localStorage['StorageData']!== null;
    }
    catch(e)
    {
        return false;
    }
}


