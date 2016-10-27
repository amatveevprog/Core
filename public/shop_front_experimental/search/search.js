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
            document.getElementsByClassName('autocomplete').autocomplete({
                data: items_json
            });
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

document.getElementById('searchinput').addEventListener('change', function(){console.log('!'); find_test();}, false);
