//основная функция назначения клавиш, где при вводе будет осуществляться подбор ключевых слов
//создает DOM-узлы(1 или более outputElem) и прикрепляет их к parentNode
function reqisterOnKeyboard(parentNode,outputElem)
{

}
function searchOnKeywords(args)
{

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
    var i=0;
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
                    elt.setAttribute("src",json_object[json_key]);
                }
                else
                {
                    elt.innerHTML=json_object[json_key];
                }
                podnode.appendChild(elt);
                i++;
            }
        }
    }
    return podnode;
}
function makeRequest(searchString,parentElt)
{
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
                createDOM("Ничего не найдено",parentElt);
                return;
            }
            createDOM(items_json,parentElt);
        }
    }
}
function makeTestRequest(parentElt)
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
}
function createDOM(items_json,parentElt)
{
    if(typeof items_json == "string")
    {
        var child = document.createElement('div');
        child.innerHTML="Извините, ничено не найдено...";
        parentElt.appendChild(child);
        return;
    }
    for(var current_item in items_json.items)
    {
        //разбираем по элементам и создаем для них DOM-структуру
        parentElt.appendChild(createDomFromMappings(items_json.items[current_item]));

    }
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
    //alert("Зашел!!!! "+query+database_map);
    var resultDiv = document.getElementById('results');

    //очищаем перед вставкой
    //innerHtml="";
    while(resultDiv.childNodes.length>0)
    {
        resultDiv.removeChild(resultDiv.childNodes[0]);
    }
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
var downloaded_items_array=[];
function downloadItemsForQuickSearch()
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/API/get_named_items_js_named_items', true);
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
        console.log(Date.now());
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
//функция, которая будет запускаться при нажатии на каждую кнопку, кроме служебных
function searchInLocalArray(input_str,limit)
{
    if(downloaded_items_array.length>0)
    {
        var matched=[];
        var curr_count=0;
        //ищем с помощью regExp
        var rExp = new RegExp(input_str);
        //.test
        for(var elem in downloaded_items_array)
        {
            if(rExp.test(downloaded_items_array[elem].name))
            {
                if(curr_count<limit) {
                    matched.push(downloaded_items_array[elem]);
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
function createOptionsArrayFromMatched(select,matched)
{
    //first - clear all the items(options) in select tag
    if(matched.length>0) {
        for (var m in matched) {
            var option = createDomElt('option', {class: "option-search-item-name"});
            var childDiv = document.createElement('div');
            childDiv = createDomElt('div', {class: "option-search-item-label"});
            option.innerHTML=matched[m].name;
            option.setAttribute("O_id",matched[m]._id);
            childDiv.innerHTML = matched[m].label;
            option.addEventListener("click",function (event) {
                event.preventDefault();
                outputOneItem(event.target);
            });
            option.appendChild(childDiv);
            select.appendChild(option);
        }
    }
}
//Вывести один элемент на общем столе...
function outputOneItem(target) {
    clearSearchPalette();
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
                downloaded_items_array.push(items_json.items[item]);
            }
        }
    }
}
registerNamesLoading();
function registerQueryLiveProcessing()
{
    var query_input = document.getElementsByName("query")[0];
    console.log(query_input);
    query_input.addEventListener("keyup",function(event){
        //TODO: отфильтровать нажатие на ентер и всяких там служебных символов!!!
        //ищем в локальном массиве сочетание:
        var matched = searchInLocalArray(query_input.value,10);
        //выводим все подходящие варианты в селект
        if(matched!=[])
        {
            var select = document.getElementById("sel");
            createOptionsArrayFromMatched(select,matched);
        }
    });
}
registerQueryLiveProcessing();

function clearSearchPalette() {
    var resultDiv = document.getElementById('results');
    resultDiv.innerHTML='';
}


