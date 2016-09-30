function registerEvents(timeStampDeltaMinutes)
{
    window.onload = function () {

        if(checkIfIwasHere()==true)
        {
            //сначала проверяем, соответствует ли timestamp разумным пределам
            let DeltaMinutes = timeStampDeltaMinutes;
            let dateNow = new Date();
            console.log("now time is: " + dateNow);
            let lastTimeStamp = localStorage['TimeStamp'];
            console.log("lsat saved time: "+ lastTimeStamp);
            let delta = dateNow.getMinutes()-lastTimeStamp.getMinutes();

            console.log("delta: "+ delta);
            if(delta <= DeltaMinutes) {
                clearHtml();
                restoreHtmlSnapshot();
            }
            else
            {
                //если вышли за пределы, то удаляем данные из локального хранилища
                //можно ничего не делать, т.к. при закрытии новый снэпшот все равно сохранится

            }
        }
    }
    window.onbeforeunload = function () {
        //делаем снапшот
        window.localStorage['TimeStamp'] = Date.now();
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
