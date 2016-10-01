function registerEvents(timeStampDeltaMinutes)
{
    /*window.onload = function () {


        if(checkIfIwasHere()==true)
        {
            clearHtml();
            restoreHtmlSnapshot();
            //сначала проверяем, соответствует ли timestamp разумным пределам
            /!*let DeltaMinutes = parseFloat(timeStampDeltaMinutes)*1000;
            console.log("your delta: "+DeltaMinutes);
            let dateNow = Date.now();
            console.log("now time is: " + dateNow);
            let lastTimeStamp = parseFloat(localStorage['TimeStamp']);
            console.log("lsat saved time: "+ lastTimeStamp);
            let delta = dateNow-lastTimeStamp;
            console.log("delta: "+ delta);*!/
            /!*if(delta <= DeltaMinutes) {
                clearHtml();
                restoreHtmlSnapshot();
            }
            else
            {
                //если вышли за пределы, то удаляем данные из локального хранилища
                //можно ничего не делать, т.к. при закрытии новый снэпшот все равно сохранится

            }*!/
        }
    }*/
    window.onbeforeunload = function () {
        //делаем снапшот
        //window.localStorage['TimeStamp'] = Date.now();
        saveHtmlSnapShot();
    }
}
function clearHist()
{
    window.localStorage.clear();
}
function checkIfIwasHere()
{
    try
    {
        return 'htmlSnapshot' in window.localStorage && window.localStorage['htmlSnapshot']!== null;
    }
    catch(e)
    {
        return false;
    }
}
//функция отправки
function saveHtmlSnapShot()
{
    var htmlString = window.document.body.innerHTML;
    saveStorageData(htmlString);
    window.localStorage['catalog_object'] = catalog_object;
    window.localStorage['cart_widget'] = cart_widget;
    window.localStorage['types_menu_object'] = types_menu_object;
    window.localStorage['item_object'] = item_object;
    window.localStorage['cart_object'] = cart_object;
}
function saveStorageData(string_data) {
    if((window.localStorage['htmlSnapshot']!=null)&&(window.localStorage['htmlSnapshot']!='undefined'))
    {
        //удаляем предыдущую StorageData перед добавлением
        //случай, когда в браузере есть данные о предыдущем заходе
        window.localStorage.removeItem('htmlSnapshot');
        console.log("Вы уже здесь были!!!");
    }
    window.localStorage['htmlSnapshot'] = string_data;
}
function restoreHtmlSnapshot()
{
    document.body.innerHTML = window.localStorage['htmlSnapshot'];
}
//функция очистки
function clearHtml()
{
    window.document.body.innerHTML="";
}
