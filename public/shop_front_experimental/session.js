/**
 * Created by alexey.matveev on 02.10.2016.
 */
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
    //window.localStorage['catalog_object'] = catalog_object;
    window.localStorage['catalog_object_categories'] = JSON.stringify(catalog_object.categories);
    window.localStorage['catalog_object_items'] = JSON.stringify(catalog_object.items);
    window.localStorage['catalog_object_filtered_items'] = JSON.stringify(catalog_object.filtered_items);

   // window.localStorage['cart_widget'] = cart_widget;
    //window.localStorage['types_menu_object'] = types_menu_object;
    //window.localStorage['item_object'] = item_object;

    //window.localStorage['cart_object'] = cart_object;
    window.localStorage['cart_object_cart_items'] = JSON.stringify(cart_object.cart_items);
    window.localStorage['cart_object_cart_sum'] = JSON.stringify(cart_object.cart_sum);
    window.localStorage['cart_object_cart_item_id_counter'] = JSON.stringify(cart_object.cart_item_id_counter);
    window.localStorage['cart_object_cart_object.cart_template'] = JSON.stringify(cart_object.cart_template);

    //window.localStorage['category_widget'] = category_widget;
    window.localStorage['category_widget_arrayOfUnchecked'] = JSON.stringify(category_widget.arrayOfUnchecked);
    window.localStorage['category_widget_selected_type'] = JSON.stringify(category_widget.selected_type);
    window.localStorage['category_widget_categories_data'] = JSON.stringify(category_widget.categories_data);



}
function saveStorageData(string_data) {
    if((window.localStorage['htmlSnapshot']!=null)&&(window.localStorage['htmlSnapshot']!='undefined'))
    {
        window.localStorage.removeItem('htmlSnapshot');
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
//установить временную метку
function setTimeStamp()
{
    //var leaving_date = new Date();
    let leaving_date = Date.now();
    window.localStorage['TimeStamp'] = leaving_date;
}
//удалить временную метку
function clearTimeStamp() {
    window.localStorage['TimeStamp']="";
}
//проверить, укладывается ли разность временных меток в указанный
//внутреним параметром функции временной промежуток
//returns: false if passed more than <initial_delta_seconds> is less than difference
//between current_time and old_time
function checkTimeStamp(initial_delta_seconds)
{
    let date_now = Date.now();
    let old_time = parseInt(window.localStorage['TimeStamp'],10);
    let raz = date_now-old_time;
    let initial_delta_miliseconds = initial_delta_seconds*1000;
    if(raz>initial_delta_miliseconds)
    {
        return false;
    }
    else
    {
        return true;
    }
}
