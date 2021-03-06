/**
 * Created by alexey.matveev on 02.10.2016.
 */
function registerEvents(timeStampDeltaMinutes)
{
    window.onbeforeunload = function () {
        //делаем снапшот
        //Доделать timestamp для отдельных групп
        window.localStorage['TimeStamp'] = Date.now();
        saveHtmlSnapShot();
        //window.localStorage.clear();
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
    //f
    //var htmlString = window.document.body.innerHTML;
    //saveStorageData(htmlString);
    //window.localStorage['catalog_object'] = catalog_object;

    window.localStorage['catalog_object_categories'] = JSON.stringify(catalog_object.categories);
    window.localStorage['catalog_object_items'] = JSON.stringify(catalog_object.items);
    window.localStorage['catalog_object_filtered_items'] = JSON.stringify(catalog_object.filtered_items);

    window.localStorage['cart_object_cart_items'] = JSON.stringify(cart_object.cart_items);
    window.localStorage['cart_object_cart_sum'] = JSON.stringify(cart_object.cart_sum);
    window.localStorage['cart_object_cart_item_id_counter'] = JSON.stringify(cart_object.cart_item_id_counter);
    window.localStorage['cart_object_cart_template'] = JSON.stringify(cart_object.cart_template);

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
    console.log("now time: "+ date_now);
    console.log("old time: "+ old_time);
    console.log("DIFFERENCE: "+ raz);
    if(raz>initial_delta_miliseconds)
    {
        console.log("timestamp false");
        return false;
    }
    else
    {
        console.log("timestamp true");
        return true;
    }
}
