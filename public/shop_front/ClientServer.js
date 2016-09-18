//[====================Server Calls=========================]


// INITIAL SERVER CALLS
$(document).ready(function()
{
  //GET_ALL_ITEMS
  get_all_items();

});




//call to server to get all finish goods
function get_all_items()
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/catalog?method=get_all_items', true);
    xhr.send();
    xhr.onreadystatechange = function()
    {
      if (xhr.readyState != 4) {
        return;
      }
      if (xhr.status == 200)
      {
        var items_json = JSON.parse(xhr.responseText);
        for (var i in items_json.items)
         {
           catalog_object.filtered_items.push(items_json.items[i]);
           catalog_object.items.push(items_json.items[i]);
         }
           catalog_object.paint_all_items();
      }
      else
      {
        Materialize.toast('Ошибка! Проверьте соединение с интернетом или обратитесь в службу поддержки', 4000);
      }

    };

}
