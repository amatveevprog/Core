//основная функция назначения клавиш, где при вводе будет осуществляться подбор ключевых слов
//создает DOM-узлы(1 или более outputElem) и прикрепляет их к parentNode

//LIMIT - глобальная переменная лимита количества записей
var OUTPUT_LIMIT=10;
var ALLOW_COMBINED_SEARCH=true;
var downloaded_items_array=[];
var FL_EMPTY_RESULTS=true;

$('.dropdown-button').dropdown({
        inDuration: 50,
        outDuration: 70,
        constrain_width: true, // Does not change width of dropdown to that of the activator
        gutter: 12, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
);
document.getElementById('searchfield').addEventListener('input', function(){
    $('.dropdown-content').dropdown('open');
    var resultDiv = document.getElementById('results');
    //makeRequest(document.getElementById('searchfield').value);
    var matched = searchInLocalArray(document.getElementById('searchfield').value,OUTPUT_LIMIT);
    if(matched.length>0)
    {
        //output from local array!
        drawdropdown(matched);
    }
    else {
        var ul = document.getElementById('dropdown');
        ul.innerHTML = '<li> Ты ничего не нашел</li>';
        return;
    }

}, false);
document.getElementById('searchfield').addEventListener('keypress', function(event){
    event.stopPropagation();
    if(event.keyCode==13)
    {
        var ul = document.getElementById('dropdown');
        ul.innerHTML = '';
        //perform a search on "enter" pressed...
        find(document.getElementById('searchfield').value);
    }
});
function drawdropdown(matched_array)
{
    $('.dropdown-content').dropdown('open');
    $('.dropdown-button-search').dropdown('open');
    var ul = document.getElementById('dropdown');
    ul.innerHTML = '';
    adddropdowns(ul,matched_array);
}

function adddropdowns(ul,array_matched)
{
    //!!!те ключи, которые хотим добавить в результаты живого поиска, должны
    //быть в конфиге в database_map
    for(var i=0;i<array_matched.length;i++)
    {
        var li = document.createElement('li');
        for(var key in array_matched[i])
        {
            //идем в database_map
            if(key in database_map)
            {
                var DOM_elem = document.createElement(database_map[key].tag);
                if("content_src" in database_map[key])
                {
                    DOM_elem.setAttribute("src",array_matched[i][key]);
                }
                else
                {
                    DOM_elem.innerHTML=array_matched[i][key];
                }
                DOM_elem.className = database_map[key].class;
                li.appendChild(DOM_elem);
            }
        }
        li.setAttribute("O_id",array_matched[i]._id);
        li.addEventListener('click',function(event){
            event.preventDefault();
            outputOneItem(event.target);
        });
        ul.appendChild(li);
    }

   //return(li);
}
function outputOneItem(target) {
    //clearSearchPalette();
    var o_id;
    while((o_id=target.getAttribute("O_id"))==null)
    {
        target = target.parentNode;
    }
    //make a request to find out one item
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/API/get_one_item_js_o_id?oid='+o_id, true);
    xhr.send();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState != 4) {
            return;
        }
        if (xhr.status == 200) {
            var items_json = JSON.parse(xhr.responseText);
            //createDOM(items_json,parentElt);
            for(var item in items_json.items)
            {
                //downloaded_items_array.push(items_json.items[item]);
                //clearSearchPalette();
                clearItemsAreaPalette();
                clearFilteredItemsArray();
                //createDOM(items_json,document.getElementById("results"));
                createProductCards(items_json);
                drawProductCards();
                open_item_by_Obj_id(items_json.items[item]._id);
                //catalog_object.open_item_by_obj_id(items_json.items[item]._id);
            }

        }
    }
}
function clearItemsAreaPalette()
{
    document.getElementById("items_area").innerHTML='';
}
function clearFilteredItemsArray() {
    catalog_object.filtered_items=[];
}
function createProductCards(items_json)
{
    for(var current_item in items_json.items)
    {
        catalog_object.filtered_items.push(items_json.items[current_item]);
    }
}
function drawProductCards() {
    catalog_object.paint_all_items();
}


//test_item from test.js
function createDomFromMappings(json_object)
{
    //ключевые слова:
    //tag
    //class
    //content_src
    var DOM_NODE;
    var podnode = document.createElement('div');
    for(var json_key in json_object) {

        for (var key in database_map) {
            if (json_key==key)
            {
                //создаем элемент DOM
                var elt = createDomElt(database_map[key].tag,{class:database_map[key].class});
                // var num = document.createElement('div');
                // num.innerHTML="number: "+i+") ";
                // elt.appendChild(num);
                if(database_map[key].hasOwnProperty("content_src"))
                {
                    //при большом количестве переделать этот if на switch
                    elt.setAttribute("src",json_object[json_key]);
                }
                else
                {
                    elt.innerHTML=json_object[json_key];
                }
                podnode.appendChild(elt);
            }
        }
    }
    return podnode;
}
function makeRequest(searchString,parentElt)
{
    parentElt.innerHTML="Подождите, идет поиск...";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/API/get_search_items_js_search_items?query='+searchString, true);
    xhr.send();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState != 4) {
            return;
        }
        if (xhr.status == 200) {
            var items_json = JSON.parse(xhr.responseText);
            if(items_json.items.length<1)
            {
                if(ALLOW_COMBINED_SEARCH==true) {
                    //убираем "Извините, ничего не найдено"
                    //преобразуем массив matched в html строку параметров
                    var matched = searchInLocalArray(document.getElementById('searchfield').value, OUTPUT_LIMIT);
                    if (matched.length > 0) {
                        //ищем по всем обджект - айдишникам
                        findMultipleObjectIds(matched, parentElt);
                        return;
                    }
                    else {
                        parentElt.innerHTML='';
                        createDOM("Ничего не найдено",parentElt);
                        return;
                    }
                }
                else
                {
                    parentElt.innerHTML='';
                    createDOM("Ничего не найдено",parentElt);
                    return;
                }
            }
            parentElt.innerHTML='';
            createDOM(items_json,parentElt);
        }
    }
}

/*function makeTestRequest(parentElt)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/API/get_items_test_js_get_all_items_int', true);
    xhr.send();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState != 4) {
            return;
        }
        if (xhr.status == 200) {
            var items_json = JSON.parse(xhr.responseText);
            createDOM(items_json,parentElt);
        }
    }
}*/
function createDOM(items_json,parentElt)
{
    if(typeof items_json == "string")
    {
        var child = document.createElement('div');
        child.innerHTML="Извините, ничено не найдено...";
        parentElt.appendChild(child);
        return;
    }
    clearItemsAreaPalette();
    clearFilteredItemsArray();
    createProductCards(items_json);
    drawProductCards();
    //for(var current_item in items_json.items)
    // {
    //     //разбираем по элементам и создаем для них DOM-структуру
    //     //parentElt.appendChild(createDomFromMappings(items_json.items[current_item]));
    //     createProductCards()
    // }
}
function createDomElt(name,attributes)
{
    var node = document.createElement(name);
    if(attributes){
        for(var attr in attributes)
        {
            if(attributes.hasOwnProperty(attr))
            {
                node.setAttribute(attr,attributes[attr]);
            }
        }
    }
    for(var i=2;i<arguments.length;i++)
    {
        var child = arguments[i];
        if(typeof child == "string")
        {
            child = document.createTextNode(child);
        }
        node.appendChild(child);
    }
    return node;
}
function find(query)
{
    var resultDiv = document.getElementById('results');
    resultDiv.innerHTML='';
    makeRequest(query,resultDiv);

    //resultDiv.appendChild(createDomFromMappings(test_item));
}
function find_test()
{
    var resultDiv = document.getElementById('results');
    //очищаем перед вставкой
    while(resultDiv.childNodes.length>0)
    {
        resultDiv.removeChild(resultDiv.childNodes[0]);
    }
    makeTestRequest(resultDiv);
}
//загружаем все, что есть в БД для живого поиска...
function downloadItemsForQuickSearch()
{
    //performing a named parameters request...
    var strQuery='';
    for(var key in quickSearchObject)
    {
        strQuery+=key+"="+quickSearchObject[key]+"&";
    }
    //str.substring(indexA, length-2)
    strQuery = strQuery.substring(0,strQuery.length-1);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/API/get_all_items_configurable_js_all?'+strQuery, true);
    xhr.send();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState != 4) {
            return;
        }
        if (xhr.status == 200) {
            var items_json = JSON.parse(xhr.responseText);
            //createDOM(items_json,parentElt);
            for(var item in items_json.items)
            {
                downloaded_items_array.push(items_json.items[item]);
            }
        }
        //console.log(Date.now());
    }
}
/*function downloadItemsForQuickSearch2()
 {
 var xhr = new XMLHttpRequest();
 xhr.open('GET', '/API/get_named_items_huge_js_named_items', true);
 xhr.send();
 xhr.onreadystatechange = function()
 {
 if (xhr.readyState != 4) {
 return;
 }
 if (xhr.status == 200) {
 var items_json = JSON.parse(xhr.responseText);
 //createDOM(items_json,parentElt);
 for(var item in items_json.items)
 {
 downloaded_items_array.push(items_json.items[item]);
 }
 }
 }
 }*/
function registerNamesLoading()
{
    window.onload = function () {
        var date1 = Date.now();
        console.log(date1);
        downloadItemsForQuickSearch();
        //var date2 = Date.now();
        //console.log(date2);
        //var delta = date2-date1;
        //console.log("Поиск занял: "+delta+" мс.");
        //console.log(downloaded_items_array.length);
        //downloaded_items_array.forEach(function (cur) {
        //    console.log(cur);
        //});
    };

};

registerNamesLoading();


function clearSearchPalette() {
    var resultDiv = document.getElementById('results');
    resultDiv.innerHTML='';
}
//"Живой" поиск в локальном массиве
function searchInLocalArray(input_str,limit)
{
    if(input_str=="")
    {
        return [];
    }
    if(downloaded_items_array.length>0)
    {
        var matched=[];
        var curr_count=0;
        //ищем с помощью regExp
        var rExp = new RegExp(input_str,'i');
        //.test
        for(var elem in downloaded_items_array)
        {
            if(testRegExpForElement(rExp,downloaded_items_array[elem]))
            {
                if(curr_count<limit) {
                    matched.push(downloaded_items_array[elem]);
                    curr_count++;
                }
                else
                {
                    return matched;
                }
            }
        }
        return matched;
    }
    return [];
}
function testRegExpForElement(regExp,eleMent)
{
    for(var keys in eleMent)
    {
        if(regExp.test(eleMent[keys]))
        {
            return true;
        }
    }
    return false;
}
function findMultipleObjectIds(matched,parentElt)
{
    //1-forming a string of object ids:
    var str_O_ids='';
    for(var i=0;i<matched.length-1;i++)
    {
        str_O_ids+='param'+i+'=';
        str_O_ids+=matched[i]._id;
        str_O_ids+='&';
    }
    str_O_ids+='param'+(matched.length-1)+'='+matched[matched.length-1]._id;
    console.log(str_O_ids);
    //2- making a request on a special url...
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/API/get_multiple_obj_id_items_js_o_id?'+str_O_ids, true);
    xhr.send();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState != 4) {
            return;
        }
        if (xhr.status == 200) {
            var items_json = JSON.parse(xhr.responseText);
            //3- place objects on a palette...
            placeObjectsOnPalette(items_json,parentElt);
        }
    }

}
function placeObjectsOnPalette(json_items,parentElt)
{
    parentElt.innerHTML='';
    if(json_items.items.length>0) {
        createDOM(json_items,parentElt);
        /*for (var current_item in json_items.items) {
            //разбираем по элементам и создаем для них DOM-структуру
            parentElt.appendChild(createDomFromMappings(json_items.items[current_item]));

        }*/
    }
    else
        createDOM("Ничего не найдено...",parentElt);
}
/// /API/get_multiple_obj_id_items_js_o_id?l=572b0fa0fca0fd639273afec&p=572b0ee7fca0fd639273afc0
//document.getElementById('searchinput').addEventListener('change', function(){console.log('!'); find_test();}, false);
