/**
 * Created by alexey.matveev on 02.10.2016.
 */
//!!!!requires search.js to be included to html before this script!!!!///

//функция, которая будет запускаться при нажатии на каждую кнопку, кроме служебных
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
            if(rExp.test(downloaded_items_array[elem].name))
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
function createOptionsArrayFromMatched(select,matched)
{
    //first - clear all the items(options) in select tag
    clearSelectPalette();
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
                clearSearchPalette();
                createDOM(items_json,document.getElementById("results"));
            }
        }
    }
}
var input_str='';
function registerQueryLiveProcessing()
{
    var query_input = document.getElementsByName("query")[0];
    //console.log(query_input);
    input_str='';
    /*query_input.addEventListener("keypress",function(event){
        //console.log(event.keyCode);
        //console.log(event.which);
        //console.log(query_input.value);
        //console.log(String.fromCharCode(event.keyCode || event.charCode));
        //console.log(event);
        console.log("current carret_position: " + doGetCaretPosition(query_input));
        console.log(query_input);
        //console.log(event.keyCode);
        if(event.keyCode==8)
        {
            input_str=query_input.value;
            console.log(input_str);
            /!*if(input_str!='')
            {
                //ищем, где был нажат backspace
                var position=-1;
                for(var i=0;i<input_str.length;i++)
                {
                    if(input_str.charCodeAt(i)==8)
                    {
                        position=pos;
                        break;
                    }
                }
                console.log("position: "+position);
                //потом склеиваем 2 строки

                input_str=input_str.substring(0,input_str.length-1);
                console.log("sliced str:"+input_str);
            }*!/
            input_str=input_str.substring(0,input_str.length-1);
            console.log("sliced str:"+input_str);
        }
        else {
            if((event.keyCode!=37)&&(event.keyCode!=38)&&(event.keyCode!=39)&&(event.keyCode!=40))
            {
                //сравнить строки
                //первоочередная строка: query_value

                input_str += String.fromCharCode(event.keyCode || event.charCode);
            }
        }
        //console.log(input_str);
        //TODO: отфильтровать нажатие на ентер и всяких там служебных символов!!!
        //ищем в локальном массиве сочетание:
        console.log("Ищем строку: "+input_str.trim());
        var matched = searchInLocalArray(input_str.trim()/!*query_input.value*!/,10);
        //выводим все подходящие варианты в селект
        if(matched.length!=0)
        {
            var select = document.getElementById("sel");
            createOptionsArrayFromMatched(select,matched);
        }

    });*/
    query_input.addEventListener("keyup",function () {
        //console.log("keyUp emitted!");
        //console.log("keyUp: "+query_input.value);
        console.log("Ищем строку: "+query_input.value);
        var matched = searchInLocalArray(query_input.value,10);
        //выводим все подходящие варианты в селект
        console.log(Date.now()+"->items matched your query: "+matched);
        for (var m1 in matched)
        {
            console.log(matched[m1].name+" ;" + matched[m1].label);
        }
        if(matched.length!=0)
        {
            var select = document.getElementById("sel");
            createOptionsArrayFromMatched(select,matched);
        }
        else
            clearSelectPalette();
    });
}
registerQueryLiveProcessing();
function clearSelectPalette()
{
    var select = document.getElementById("sel");
    select.innerHTML="";
}
function doGetCaretPosition (ctrl) {

    var CaretPos = 0;
    // IE Support
    if (document.selection) {

        ctrl.focus ();
        var Sel = document.selection.createRange ();

        Sel.moveStart ('character', -ctrl.value.length);

        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;

    return (CaretPos);

}