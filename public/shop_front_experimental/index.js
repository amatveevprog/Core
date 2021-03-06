/**
 * Created by alexander.bondarik on 01.10.2016.
 */

//Check for local storage session availability
function check_local_storage_availability()
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


function checkEmptyElementsInArray(array) {
    for(var i=0;i<array.length;i++)
    {
        if(array[i] == "" || array[i] == null || array[i] == [])
            return false;
    }
    return true;
}
//checks the completion of catalog_and_category
function check_completion_of_catalog_and_category()
{
    var arr = [
    //window.localStorage['catalog_object_categories'],
    window.localStorage['catalog_object_items'],
    window.localStorage['catalog_object_filtered_items'],
    //window.localStorage['category_widget_arrayOfUnchecked'],
    window.localStorage['category_widget_selected_type'],
    window.localStorage['category_widget_categories_data']];
    if(checkEmptyElementsInArray(arr)==true)
    {
        return true;
    }
    else
    {
        return false;
    }
};
function check_completion_of_cart() {
    var arr = [window.localStorage['cart_object_cart_items'],
        window.localStorage['cart_object_cart_sum'],
        window.localStorage['cart_object_cart_item_id_counter']];
    if(checkEmptyElementsInArray(arr)==true)
    {
        return true;
    }
    else
    {
        return false;
    }
};

function cart_object_init_from_localStorage()
{
    cart_object.cart_items = JSON.parse(window.localStorage['cart_object_cart_items']);
    cart_object.cart_sum = JSON.parse(window.localStorage['cart_object_cart_sum']);
    cart_object.cart_item_id_counter = JSON.parse(window.localStorage['cart_object_cart_item_id_counter']);
}
function cart_object_clear() {
    cart_object.cart_items = [];
    cart_object.cart_sum = 0;
    cart_object.cart_item_id_counter=0;
}
function check_timestamp(seconds) {
    //change seconds to hours!!!
    return checkTimeStamp(seconds);
}

//Global Variables
var catalog_object = new catalog();
var category_widget = new Category_widget();
var types_menu_object = new types_menu();
var item_object = new item_card();
var cart_object = new shopping_cart();


$(document).ready(function()
{
    //delta time for timestamp checking
    var delta_time = 60;
    shop_engine_init.then(get_all_items(),function(){console.log('Init Error')});
    //Check local storage
   if(check_local_storage_availability() == true)
   {
       registerEvents(0);
       //1st step: check cart completion
       if(check_completion_of_cart()==true)
       {
           if(check_timestamp(delta_time)) {
               //just copying elements from localStorage to cart object
               cart_object_init_from_localStorage();
           }
           else
           {
               cart_object_clear();
           }
       }
       if(check_completion_of_catalog_and_category()==true)
       {
           if(check_timestamp(delta_time)) {
               //console.log("STAB FOR LAST SESSION RECOVERY");
               Materialize.toast('Мы сохранили Ваш прогресс. Продолжить с того момента где Вы остановились? <button onclick = "process_toast(this)">Да</button>  <button onclick = "delete_toast(this)">нет</button>', 14000);
               //shop_engine_read_from_storage();
           }
       }

   }
});


function delete_toast(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);
    window.localStorage.clear();
    cart_object.cart_items=[];
    cart_object.cart_sum = "";
    cart_object.cart_item_id_counter='';
}

function process_toast(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);
    shop_engine_read_from_storage();
}
function shop_engine_read_from_storage(resolve,reject)
{
    console.log('read from storage');


    var cart_dialog_tabs_html = "<div class = 'header grey lighten-4' style = 'margin:0px;padding:0px;'>  <div class = 'row' id = 'cart_tabs' style = 'height:100%;margin-top:0px;padding-top:0px;'>    <div id = 'cart_tab_items' class = 'col s2 m2 l2 2 light green valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>          <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> list </i>          <hr>          Товары      </div>    </div>    <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>         <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> card_giftcard</i>         <hr>         Упаковка      </div>    </div>    <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>         <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'>local_shipping</i>         <hr>Доставка      </div>    </div>    <div id = 'cart_tab_pay' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>         <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> payment</i>         <hr>         Оплата      </div>    </div>      <div id = 'cart_tab_submit' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>        <div>          <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> done </i>          <hr>          Отслеживание        </div>      </div>      <div>        <hr>        <div id = 'cart_content'>                   </div>      </div>    </div>";
    var cart_dialog_items_html = "<div class = 'header grey lighten-4' style = 'margin:0px;padding:0px;'>  <div class = 'row' id = 'cart_tabs' style = 'height:100%;margin-top:0px;padding-top:0px;'>    <div id = 'cart_tab_items' class = 'col s2 m2 l2 2 light green valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>          <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> list </i>          <hr>          Товары      </div>    </div>    <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 valign-wrapper hoverable waves-effect waves-yellow center-align z-depth-1' style = 'height:100px; padding:1%;background:#FAFAFA'>      <div>         <i class = 'material-icons  z-depth-1' style = 'border-radius:999px;padding:3%'> card_giftcard</i>         <hr>         Упаковка      </div>    </div>    <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2  valign-wrapper hoverable waves-effect waves-yellow center-align z-depth-1' style = 'height:100px; padding:1%;background:#FAFAFA'>      <div>         <i class = 'material-icons  z-depth-1' style = 'border-radius:999px;padding:3%'>local_shipping</i>         <hr>Доставка      </div>    </div>    <div id = 'cart_tab_pay' class = 'col s2 m2 l2 2 valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%; background:#FAFAFA'>      <div>         <i class = 'material-icons  z-depth-1' style = 'border-radius:999px;padding:3%;background:#FAFAFA'> payment</i>         <hr>         Оплата      </div>    </div>      <div id = 'cart_tab_submit' class = 'col s2 m2 l2 2  valign-wrapper hoverable waves-effect waves-yellow center-align z-depth-1' style = 'height:100px; padding:1%; background:#FAFAFA'>        <div>          <i class = 'material-icons  z-depth-1' style = 'border-radius:999px;padding:3%'> done </i>          <hr>          Отслеживание        </div>      </div>      <div>        <hr>        <div id = 'cart_content'>           <div class = 'row' style = ''> <div class = 'col s12 m12 l12 12 center-align purple lighten-4' id = 'cart_dialog_order_summary' style = 'margin-top:3%; background:#FAFAFA; margin-bottom:3%; padding:2%; background:#FAFAFA'>                 <h4 > Ваш заказ: </h4>                                           <h6 id = 'cart_items_counter'> Всего товаров: 24 </h6>                 <h5 id = 'cart_items_price'> На сумму: 670р.</h5>                                             * для выбора упаковки перейдите на следующий экран      </div>                                                                <div class = 'col s12 m12 l12 12 z-depth-1' style = ' background:#FAFAFA;padding:3%' >   <table class = 'responsive-table highlight striped' style = 'background:#FAFAFA; z-depth-1; padding:2%;'>                <thead>                  <tr>   <th data-field='id'>Фото</th>                    <th data-field='name'>Наименование</th>                    <th data-field='type'>Тип</th>                                                                            <th data-field='quantity'>количество</th>                    <th data-field='price'>цена</th>                  </tr>                                                                               <tbody id = 'cart_items_table'>                                                   </tbody>              </table>            </div>                                        </div>        </div>      </div>    </div>";
    var cart_dialog_pack_html = "<div class = 'center-align'><div id = 'cart_dialog_pack_primary' class = 'col s12 m12 l12 12 z-depth-1' style = 'padding:3%; margin-top:3%; margin-bottom:1%;'></div><div id = 'cart_dialog_pack_1stage_label' class = 'left-align col s12 m12 l12 12 grey-text darken-2-text' style = 'margin:1%'></div><div id = 'cart_dialog_pack_1stage' style= 'margin-top:1%; margin-bottom:1%; background:#FAFAFA; display:none' class = 'cart_dialog_screen_pack white col s12 m12 l12 12 z-depth-1'></div><div id = 'cart_dialog_pack_2stage_label' class = 'left-align col s12 m12 l12 12 grey-text darken-2-text' style = 'margin:1%' ></div><div style= 'margin-top:1%;margin-bottom:1%; padding:2%; display:none'  id = 'cart_dialog_pack_2stage' class = 'cart_dialog_screen_pack col s12 m12 l12 12 white z-depth-1'></div><div id = 'cart_dialog_pack_3stage_label' class ='left-align col s12 m12 l12 12 grey-text darken-2-text' style = 'margin:1%'></div><div style= 'margin-top:1%;margin-bottom:1%; padding:2%;display:none'    id = 'cart_dialog_pack_3stage' class = 'cart_dialog_screen_pack col s12 m12 l12 12 white z-depth-1'></div><div id = 'cart_dialog_pack_4stage_label' class = 'left-align col s12 m12 l12 12 grey-text darken-2-text' style = 'margin:1%' ></div><div id = 'cart_dialog_pack_4stage'  style= 'margin-top:1%; margin-bottom:1%;padding:2%;display:none'  class = 'cart_dialog_screen_pack col s12 m12 l12 12 white z-depth-1'></div><div id = 'cart_dialog_pack_pack_grid'  style= 'margin-top:1%;padding:2%;display:none'  class = 'cart_dialog_screen_pack col s12 m12 l12 12 white z-depth-1'></div></div>";
    cart_object.cart_dialog_tabs_html = cart_dialog_tabs_html;
    cart_object.cart_dialog_items_html = cart_dialog_items_html;
    cart_object.cart_dialog_pack_html = cart_dialog_pack_html;


    try
    {

        cart_object.cart_items = JSON.parse(window.localStorage['cart_object_cart_items']);
        cart_object.cart_sum = JSON.parse(window.localStorage['cart_object_cart_sum']);
        cart_object.cart_item_id_counter = JSON.parse(window.localStorage['cart_object_cart_item_id_counter']);
    }
    catch(e)
    {
        console.log(e);
    }

    cart_object.draw_widget();
    cart_object.calculate_price();

    //INIT catalog

    //masonry element

    var element_html_template = '<div class="card" style = "margin: 1rem auto; min-width:200px; max-width:250px; max-height:300px;box-shadow:none;padding: 0% !important;" onclick = "open_item('+ "&catalog_tile_open_item&" +')">' +
        '<div class="card-image waves-effect waves-block waves-light">   ' +
        '<img id = "catalog_tile_image_src" class="activator" src="'
        + " &catalog_tile_image_src&" + '" style = "height: 200px; min-width:180px; max-width:250px;">     </div>' +
        '<div class="card-content"><span id = "catalog_tile_label"  class="card-title activator truncate grey-text text-darken-4">'
        + "&catalog_tile_label&"+'<br></span> <div class = "row"><h6 id = "catalog_tile_price" style="font-size: 130%; text-align: center; color: limegreen">'
        +"&catalog_tile_price&"+ '<img src="http://lamcdn.net/the-village.ru/post_image-image/VH8zUVbOtjPGSVSkuovNyg-article.png" height="15px" width="15px"></h6></div></div> </div>';

    try
    {
        catalog_object.tile_item_template = element_html_template;
        catalog_object.items = JSON.parse(window.localStorage['catalog_object_items']);
        catalog_object.filtered_items = JSON.parse(window.localStorage['catalog_object_filtered_items']);
    }
    catch(e)
    {
        console.log(e);
    }




    var item_template = "<div class='modal-content'><div class = 'header'><div class = 'row'><div class = 'col s3 m3 l3 3 yellow'><h5 id = 'PRODUCT_NAME'>PRODUCT_NAME</h5></div><div class = 'col s5 m5 l5 5'><ul class='tabs'><li class='tab col s3'><a class='active' href='#PRODUCT_DESCRIPTION'>Информация</a></li><li class='tab col s3'><a href='#product_photos'>Фогорафии</a></li><li class='tab col s3'> <a href='#similar'>Похожие</a></li><li class='tab col s3'><a href='#howto'>Как заваривать</a></li></ul></div><div class = 'col s4 m4 l4 4 blue-grey lighten-3'><h5>Комментарии</h5></div></div><div class = 'row'><div class = 'col s3 m3 l3 3'><img id = 'IMAGE_SRC' style = 'width:100%' src = ''><h5 id = 'PRODUCT_PRICE'> </h5><h5 id = 'PRODUCT_RATE'></h5> <hr> <div id = 'item_card_oprions_div'></div></div><div class = 'col s5 m5 l5 5'><div id='PRODUCT_DESCRIPTION' class='col s12'></div><div id='product_photos' class='col s12 m12 l12 12'></div><div id='similar' class='col s12'>Test 3</div><div id='howto' class='col s12'>Test 4</div></div><div id = 'comments_area' class = 'col s4 m4 l4 4'>Comments Area</div><div></div></div>";
    item_object.item_template = item_template;


    category_widget.target_div = 'category_widget_div';
    category_widget.selected_type = JSON.parse(window.localStorage['category_widget_selected_type']);
    category_widget.categories_data =
    {
        "types": [
            {
                "group_type": "dishes",
                "group_label":"Посуда",
                "group_img":"https://cdn4.iconfinder.com/data/icons/drink-me/500/oolong-512.png",
                "groups": [
                    {
                        "id":"tea_pots",
                        "label":"чайники",
                        "icon":"invert_colors",
                        "categories":[
                            {
                                "id": "category_glass_pots",
                                "label": "Стеклянные"
                            }
                        ]
                    },
                    {
                        "id":"tea_cups",
                        "label":"чашки",
                        "icon":"invert_colors",
                        "categories":[
                            {
                                "id": "category_pottery_cups",
                                "label": "Глиненные"
                            }
                        ]
                    }
                ]
            },
            {
                "group_type": "tea",
                "group_label":"Чай",
                "group_img":"http://scottbrookshiredesign.com/sage/images/icon-leaf.png",
                "groups": [
                    {
                        "id": "tea_type",
                        "label": "Тип чая",
                        "icon": "invert_colors",
                        "categories": [
                            {
                                "id": "category_green",
                                "label": "Зеленые"
                            },
                            {
                                "id": "category_red",
                                "label": "Красные"
                            },
                            {
                                "id": "category_ulyn",
                                "label": "Улуны"
                            },
                            {
                                "id": "category_puerh",
                                "label": "Пуэры"
                            }
                        ]
                    },
                    {
                        "id": "country",
                        "label": "Страна",
                        "icon": "account_balance",
                        "categories": [
                            {
                                "id": "category_china",
                                "label": "Китай"
                            },
                            {
                                "id": "category_india",
                                "label": "Индия"
                            },
                            {
                                "id": "category_japan",
                                "label": "Япония"
                            },
                            {
                                "id": "category_srilanka",
                                "label": "Шри-Ланка"
                            }
                        ]
                    }
                ]
            },
            {
                "group_type": "herbd",
                "group_label":"Травы и Добавки",
                "group_img":"https://cdn4.iconfinder.com/data/icons/medical-5/500/herb-128.png",
                "groups": []
            },
            {
                "group_type": "presents",
                "group_label":"Подарочные наборы",
                "group_img":"http://www.megaicons.net/static/img/icons_title/8/178/title/ecommerce-gift-icon.png",
                "groups": []
            }
        ]
    };

    category_widget.init(category_widget);
    category_widget.arrayOfUnchecked = JSON.parse(window.localStorage['category_widget_arrayOfUnchecked']);
    check_categories(category_widget)

    catalog_object.search(category_widget.arrayOfUnchecked,category_widget.selected_type);

    types_menu_object.target_div = 'types_area';
    types_menu_object.init(types_menu_object,category_widget);








};

shop_engine_init = new Promise(function(resolve, reject)
{
        console.log('not read from storage');
//CART_DIALOG

        var cart_dialog_tabs_html = "<div class = 'header grey lighten-4' style = 'margin:0px;padding:0px;'>  <div class = 'row' id = 'cart_tabs' style = 'height:100%;margin-top:0px;padding-top:0px;'>    <div id = 'cart_tab_items' class = 'col s2 m2 l2 2 light green valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>          <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> list </i>          <hr>          Товары      </div>    </div>    <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>         <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> card_giftcard</i>         <hr>         Упаковка      </div>    </div>    <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>         <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'>local_shipping</i>         <hr>Доставка      </div>    </div>    <div id = 'cart_tab_pay' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>         <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> payment</i>         <hr>         Оплата      </div>    </div>      <div id = 'cart_tab_submit' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>        <div>          <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> done </i>          <hr>          Отслеживание        </div>      </div>      <div>        <hr>        <div id = 'cart_content'>                   </div>      </div>    </div>";
        var cart_dialog_items_html = "<div class = 'header grey lighten-4' style = 'margin:0px;padding:0px;'>  <div class = 'row' id = 'cart_tabs' style = 'height:100%;margin-top:0px;padding-top:0px;'>    <div id = 'cart_tab_items' class = 'col s2 m2 l2 2 light green valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>          <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> list </i>          <hr>          Товары      </div>    </div>    <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 valign-wrapper hoverable waves-effect waves-yellow center-align z-depth-1' style = 'height:100px; padding:1%;background:#FAFAFA'>      <div>         <i class = 'material-icons  z-depth-1' style = 'border-radius:999px;padding:3%'> card_giftcard</i>         <hr>         Упаковка      </div>    </div>    <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2  valign-wrapper hoverable waves-effect waves-yellow center-align z-depth-1' style = 'height:100px; padding:1%;background:#FAFAFA'>      <div>         <i class = 'material-icons  z-depth-1' style = 'border-radius:999px;padding:3%'>local_shipping</i>         <hr>Доставка      </div>    </div>    <div id = 'cart_tab_pay' class = 'col s2 m2 l2 2 valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%; background:#FAFAFA'>      <div>         <i class = 'material-icons  z-depth-1' style = 'border-radius:999px;padding:3%;background:#FAFAFA'> payment</i>         <hr>         Оплата      </div>    </div>      <div id = 'cart_tab_submit' class = 'col s2 m2 l2 2  valign-wrapper hoverable waves-effect waves-yellow center-align z-depth-1' style = 'height:100px; padding:1%; background:#FAFAFA'>        <div>          <i class = 'material-icons  z-depth-1' style = 'border-radius:999px;padding:3%'> done </i>          <hr>          Отслеживание        </div>      </div>      <div>        <hr>        <div id = 'cart_content'>           <div class = 'row' style = ''> <div class = 'col s12 m12 l12 12 center-align purple lighten-4' id = 'cart_dialog_order_summary' style = 'margin-top:3%; background:#FAFAFA; margin-bottom:3%; padding:2%; background:#FAFAFA'>                 <h4 > Ваш заказ: </h4>                                           <h6 id = 'cart_items_counter'> Всего товаров: 24 </h6>                 <h5 id = 'cart_items_price'> На сумму: 670р.</h5>                                             * для выбора упаковки перейдите на следующий экран      </div>                                                                <div class = 'col s12 m12 l12 12 z-depth-1' style = ' background:#FAFAFA;padding:3%' >   <table class = 'responsive-table highlight striped' style = 'background:#FAFAFA; z-depth-1; padding:2%;'>                <thead>                  <tr>   <th data-field='id'>Фото</th>                    <th data-field='name'>Наименование</th>                    <th data-field='type'>Тип</th>                                                                            <th data-field='quantity'>количество</th>                    <th data-field='price'>цена</th>                  </tr>                                                                               <tbody id = 'cart_items_table'>                                                   </tbody>              </table>            </div>                                        </div>        </div>      </div>    </div>";
        var cart_dialog_pack_html = "<div class = 'center-align'><div id = 'cart_dialog_pack_primary' class = 'col s12 m12 l12 12 z-depth-1' style = 'padding:3%; margin-top:3%; margin-bottom:1%;'></div><div id = 'cart_dialog_pack_1stage_label' class = 'left-align col s12 m12 l12 12 grey-text darken-2-text' style = 'margin:1%'></div><div id = 'cart_dialog_pack_1stage' style= 'margin-top:1%; margin-bottom:1%; background:#FAFAFA; display:none' class = 'cart_dialog_screen_pack white col s12 m12 l12 12 z-depth-1'></div><div id = 'cart_dialog_pack_2stage_label' class = 'left-align col s12 m12 l12 12 grey-text darken-2-text' style = 'margin:1%' ></div><div style= 'margin-top:1%;margin-bottom:1%; padding:2%; display:none'  id = 'cart_dialog_pack_2stage' class = 'cart_dialog_screen_pack col s12 m12 l12 12 white z-depth-1'></div><div id = 'cart_dialog_pack_3stage_label' class ='left-align col s12 m12 l12 12 grey-text darken-2-text' style = 'margin:1%'></div><div style= 'margin-top:1%;margin-bottom:1%; padding:2%;display:none'    id = 'cart_dialog_pack_3stage' class = 'cart_dialog_screen_pack col s12 m12 l12 12 white z-depth-1'></div><div id = 'cart_dialog_pack_4stage_label' class = 'left-align col s12 m12 l12 12 grey-text darken-2-text' style = 'margin:1%' ></div><div id = 'cart_dialog_pack_4stage'  style= 'margin-top:1%; margin-bottom:1%;padding:2%;display:none'  class = 'cart_dialog_screen_pack col s12 m12 l12 12 white z-depth-1'></div><div id = 'cart_dialog_pack_pack_grid'  style= 'margin-top:1%;padding:2%;display:none'  class = 'cart_dialog_screen_pack col s12 m12 l12 12 white z-depth-1'></div></div>";
        cart_object.cart_dialog_tabs_html = cart_dialog_tabs_html;
        cart_object.cart_dialog_items_html = cart_dialog_items_html;
        cart_object.cart_dialog_pack_html = cart_dialog_pack_html;
        cart_object.draw_widget();

        //INIT catalog

//masonry element

        var element_html_template = '<div class="card" style = "margin: 1rem auto; min-width:200px; max-width:250px; max-height:300px;box-shadow:none;padding: 0% !important;" onclick = "open_item('+ "&catalog_tile_open_item&" +')">' +
            '<div class="card-image waves-effect waves-block waves-light">   ' +
            '<img id = "catalog_tile_image_src" class="activator" src="'
            + " &catalog_tile_image_src&" + '" style = "height: 200px; min-width:180px; max-width:250px;" ">     </div>' +
            '<div class="card-content"><span id = "catalog_tile_label"  class="card-title activator truncate grey-text text-darken-4">'
            + "&catalog_tile_label&"+'<br></span> <div class = "row"><h6 id = "catalog_tile_price" style="font-size: 130%; text-align: center; color: limegreen">'
            +"&catalog_tile_price&"+ '<img src="http://lamcdn.net/the-village.ru/post_image-image/VH8zUVbOtjPGSVSkuovNyg-article.png" height="15px" width="15px"></h6></div></div> </div>';

            catalog_object.tile_item_template = element_html_template;



        var item_template = "<div class='modal-content'><div class = 'header'><div class = 'row'><div class = 'col s3 m3 l3 3 yellow'><h5 id = 'PRODUCT_NAME'>PRODUCT_NAME</h5></div><div class = 'col s5 m5 l5 5'><ul class='tabs'><li class='tab col s3'><a class='active' href='#PRODUCT_DESCRIPTION'>Информация</a></li><li class='tab col s3'><a href='#product_photos'>Фогорафии</a></li><li class='tab col s3'> <a href='#similar'>Похожие</a></li><li class='tab col s3'><a href='#howto'>Как заваривать</a></li></ul></div><div class = 'col s4 m4 l4 4 blue-grey lighten-3'><h5>Комментарии</h5></div></div><div class = 'row'><div class = 'col s3 m3 l3 3'><img id = 'IMAGE_SRC' style = 'width:100%' src = ''><h5 id = 'PRODUCT_PRICE'> </h5><h5 id = 'PRODUCT_RATE'></h5> <hr> <div id = 'item_card_oprions_div'></div></div><div class = 'col s5 m5 l5 5'><div id='PRODUCT_DESCRIPTION' class='col s12'></div><div id='product_photos' class='col s12 m12 l12 12'></div><div id='similar' class='col s12'>Test 3</div><div id='howto' class='col s12'>Test 4</div></div><div id = 'comments_area' class = 'col s4 m4 l4 4'>Comments Area</div><div></div></div>";
        item_object.item_template = item_template;



        category_widget.target_div = 'category_widget_div';
        category_widget.selected_type = 'tea';
        category_widget.categories_data =
        {
            "types": [
                {
                    "group_type": "dishes",
                    "group_label":"Посуда",
                    "group_img":"https://cdn4.iconfinder.com/data/icons/drink-me/500/oolong-512.png",
                    "groups": [
                        {
                            "id":"tea_pots",
                            "label":"чайники",
                            "icon":"invert_colors",
                            "categories":[
                                {
                                    "id": "category_glass_pots",
                                    "label": "Стеклянные"
                                }
                            ]
                        },
                        {
                            "id":"tea_cups",
                            "label":"чашки",
                            "icon":"invert_colors",
                            "categories":[
                                {
                                    "id": "category_pottery_cups",
                                    "label": "Глиненные"
                                }
                            ]
                        }
                    ]
                },
                {
                    "group_type": "tea",
                    "group_label":"Чай",
                    "group_img":"http://scottbrookshiredesign.com/sage/images/icon-leaf.png",
                    "groups": [
                        {
                            "id": "tea_type",
                            "label": "Тип чая",
                            "icon": "invert_colors",
                            "categories": [
                                {
                                    "id": "category_green",
                                    "label": "Зеленые"
                                },
                                {
                                    "id": "category_red",
                                    "label": "Красные"
                                },
                                {
                                    "id": "category_ulyn",
                                    "label": "Улуны"
                                },
                                {
                                    "id": "category_puerh",
                                    "label": "Пуэры"
                                }
                            ]
                        },
                        {
                            "id": "country",
                            "label": "Страна",
                            "icon": "account_balance",
                            "categories": [
                                {
                                    "id": "category_china",
                                    "label": "Китай"
                                },
                                {
                                    "id": "category_india",
                                    "label": "Индия"
                                },
                                {
                                    "id": "category_japan",
                                    "label": "Япония"
                                },
                                {
                                    "id": "category_srilanka",
                                    "label": "Шри-Ланка"
                                }
                            ]
                        }
                    ]
                },
                {
                    "group_type": "herbd",
                    "group_label":"Травы и Добавки",
                    "group_img":"https://cdn4.iconfinder.com/data/icons/medical-5/500/herb-128.png",
                    "groups": []
                },
                {
                    "group_type": "presents",
                    "group_label":"Подарочные наборы",
                    "group_img":"http://www.megaicons.net/static/img/icons_title/8/178/title/ecommerce-gift-icon.png",
                    "groups": []
                }
            ]
        };
        category_widget.init(category_widget);

        types_menu_object.target_div = 'types_area';
        types_menu_object.init(types_menu_object,category_widget);





        resolve('true');
}
);




//Save_All_To_LocalStorage()
function Save_To_Storage()
{

}


// check categories

function check_categories(categories_object)
{


var check_boxes = document.getElementsByClassName('category_widget_check_box');

    console.log('lets put checkboxes');
    console.log(categories_object);
    console.log('=======================================Check_Boxes_Array===========================');
    console.log(check_boxes);



for(var i in check_boxes)
{
    //console.log('lets start Checking boxes');
    check_boxes[i].checked = 'checked';

    for(var j in categories_object.arrayOfUnchecked)
    {
        //console.log('check ' +check_boxes[i].id +'   ' + categories_object.arrayOfUnchecked[j] );
        if (check_boxes[i].id == categories_object.arrayOfUnchecked[j])
        {
            console.log('setting checkbox of ' +  check_boxes[i].id);
            check_boxes[i].checked = '';
        }
    }
}
}