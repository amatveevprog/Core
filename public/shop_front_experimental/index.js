/**
 * Created by alexander.bondarik on 01.10.2016.
 */

//Global Variables
var  catalog_object = new catalog();
var cart_widget = new Category_widget();
var types_menu_object = new types_menu();
var item_object = new item_card();




$(document).ready(function()
{
    //GET_ALL_ITEMS

    //Check local storage
   if(check_local_storage_availability() == true)
   {
     // Upload from local storage
       // Draw_HTML
          document.body.innerHTML = window.localStorage['htmlSnapshot'];
       // Init Cart
          cart_widget = window.localStorage['cart_onject'];


   }
   else
   {

    //Normal_init
       shop_engine_init.then(get_all_items(),function(){console.log('Init Error')});

   }


});






var  shop_engine_init = new Promise(function(resolve, reject)
{

//INIT catalog
    //catalog_object = new catalog();
    var element_html_template = '<div class="card"><div class="card-image waves-effect waves-block waves-light">   <img id = "catalog_tile_image_src" class="activator" src="'
        + " &catalog_tile_image_src&" + '" style = "height:200px;">     </div><div class="card-content"><span id = "catalog_tile_label"  class="card-title activator truncate grey-text text-darken-4">'
        + "&catalog_tile_label&"+'<i class="material-icons right">more_vert</i></span> <div class = "row"><div class = "col m19 s9 l9 9"><p><a id = "catalog_tile_open_item" class="waves-effect waves-light btn" onclick = "open_item('
        + "&catalog_tile_open_item&"+')">ТЕСТЗАМЕНА</a></p></div><div class = "col m8 s3 l3 3"><h5 id = "catalog_tile_price">'
        +"&catalog_tile_price&"+ '</h5></div></div></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span><p>Here is some more information about this product that is only revealed once clicked on.</p></div> </div>';
    catalog_object.tile_item_template = element_html_template;

// INIT Item Card
    var item_template = "<div class='modal-content'><div class = 'header'><div class = 'row'><div class = 'col s3 m3 l3 3 yellow'><h5 id = 'PRODUCT_NAME'>PRODUCT_NAME</h5></div><div class = 'col s5 m5 l5 5'><ul class='tabs'><li class='tab col s3'><a class='active' href='#PRODUCT_DESCRIPTION'>Информация</a></li><li class='tab col s3'><a href='#product_photos'>Фогорафии</a></li><li class='tab col s3'> <a href='#similar'>Похожие</a></li><li class='tab col s3'><a href='#howto'>Как заваривать</a></li></ul></div><div class = 'col s4 m4 l4 4 blue-grey lighten-3'><h5>Комментарии</h5></div></div><div class = 'row'><div class = 'col s3 m3 l3 3'><img id = 'IMAGE_SRC' style = 'width:100%' src = ''><h5 id = 'PRODUCT_PRICE'> </h5><h5 id = 'PRODUCT_RATE'></h5> <hr> <div id = 'item_card_oprions_div'></div></div><div class = 'col s5 m5 l5 5'><div id='PRODUCT_DESCRIPTION' class='col s12'></div><div id='product_photos' class='col s12 m12 l12 12'></div><div id='similar' class='col s12'>Test 3</div><div id='howto' class='col s12'>Test 4</div></div><div id = 'comments_area' class = 'col s4 m4 l4 4'>Comments Area</div><div></div></div>";
    //item_object = new item_card();
    item_object.item_template = item_template;


// INIT Categories Widget
    //cart_widget = new Category_widget();
    cart_widget.target_div = 'category_widget_div';
    cart_widget.selected_type = 'tea';
    cart_widget.categories_data =
    {
        "types": [
            {
                "group_type": "dishes",
                "group_label":"Посуда",
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
            }
        ]
    };
    cart_widget.init(cart_widget);

 // INIT Types widget
    //types_menu_object = new types_menu();
    types_menu_object.target_div = 'types_area';
    types_menu_object.init(types_menu_object,cart_widget);


    resolve(true);


}
);


//Check for local storage session availability
function check_local_storage_availability()
{
    return(true);
}



//Save_All_To_LocalStorage()
function Save_To_Storage()
{

}