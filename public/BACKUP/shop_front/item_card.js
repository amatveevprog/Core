function item_card()
{
  this.item_template = '';
  
  this.open_item = function(item_id)
  {
    // Get all the item_by_id
    var item;
    for(var i in catalog_object.items)
     {
       if(catalog_object.items[i].id == item_id)
        {
          item = catalog_object.items[i];
        }
     }

    // Test vreateion of full height modal

    var modal_content = document.getElementById('modal_content');
    var html_str = this.item_template;
    //html_str.replace("PRODUCT_NAME", item.name);
    modal_content.innerHTML = html_str;
    //Set product name
    document.getElementById('PRODUCT_NAME').innerText = item.label;
    //Set product image
    document.getElementById('IMAGE_SRC').src = item.image_src;
    //Set product description
    document.getElementById('PRODUCT_DESCRIPTION').innerHTML = item.description;
    //Set product price
    document.getElementById('PRODUCT_PRICE').innerHTML = "Цена  " + item.price + "р  /за 100гр";
    //Set product rate
    document.getElementById('PRODUCT_RATE').innerHTML = "Рейтинг " + item.rate;
    console.log('preparing for updateing photos...');


    //Set product photos
    try
    {
      var str_html  = '';
      for(var j in item.photos)
       {
         str_html = str_html + '<div class = "col s4 m4 l4 4" style = "margin-bottom:4%;">';
         str_html = str_html + '<img class = "materialboxed z-depth-1"  width = "100%" src = "' +item.photos[j] +'">';
         str_html = str_html + '</div>';
       }


       //add button and options
       var modal_footer = document.getElementById("modal_footer");
       var add_button_html = "<div class = 'col s4 m4 l4 4'><a class='waves-effect waves-light light-green btn'  id='add_to_cart_button' style = 'width:100%; font-size:130%'><i class='material-icons left'>shopping_cart</i>Добавить в корзину</a></div>";
     //  modal_footer.innerHTML = add_button_html;
       //set callback for add_to_cart
       console.log('try to set onclick');

       console.log('added photos');
       //Add options
         var options_html = '';
         var options_div = document.getElementById('item_card_oprions_div');




          // adding type
          options_html = options_html + "<div class = 'col s2 m2 l2 2'><p>граммаж</p></div><div class = 'col s2 m2 l2 2'><select id = 'item_card_options_type'><option value='' disabled selected> выбирете вес </option>";
           for(var k in item.variants)
            {
                  options_html = options_html + "<option value='"+item.variants[k].name+"'>"+item.variants[k].name+"</option>";
            }

           options_html = options_html + "</select></div>";
           // adding quantity
           options_html = options_html + "<div class = 'col s2 m2 l2 2'><p>количество:</p></div><div class = 'col s1 m1 l1 1'><input id='item_card_options_quantity' type='number' class='validate'></div>";

          //options_div.innerHTML = options_html;
          modal_footer.innerHTML = '<div class = "row">' + options_html + add_button_html  + '</div>';

          document.getElementById('add_to_cart_button').onclick = function(){console.log('clicked!'); add_to_cart(item.id);};
          $(document).ready(function() {
                        $('select').material_select();
                      });



      document.getElementById('product_photos').innerHTML = str_html;
    }
    catch(e)
    {
      console.log(e.toString());
    }
    $('ul.tabs').tabs();
    $('.materialboxed').materialbox();
    $('#modal_window').openModal();
  };
}








var item_template = "<div class='modal-content'><div class = 'header'><div class = 'row'><div class = 'col s3 m3 l3 3 yellow'><h5 id = 'PRODUCT_NAME'>PRODUCT_NAME</h5></div><div class = 'col s5 m5 l5 5'><ul class='tabs'><li class='tab col s3'><a class='active' href='#PRODUCT_DESCRIPTION'>Информация</a></li><li class='tab col s3'><a href='#product_photos'>Фогорафии</a></li><li class='tab col s3'> <a href='#similar'>Похожие</a></li><li class='tab col s3'><a href='#howto'>Как заваривать</a></li></ul></div><div class = 'col s4 m4 l4 4 blue-grey lighten-3'><h5>Комментарии</h5></div></div><div class = 'row'><div class = 'col s3 m3 l3 3'><img id = 'IMAGE_SRC' style = 'width:100%' src = ''><h5 id = 'PRODUCT_PRICE'> </h5><h5 id = 'PRODUCT_RATE'></h5> <hr> <div id = 'item_card_oprions_div'></div></div><div class = 'col s5 m5 l5 5'><div id='PRODUCT_DESCRIPTION' class='col s12'></div><div id='product_photos' class='col s12 m12 l12 12'></div><div id='similar' class='col s12'>Test 3</div><div id='howto' class='col s12'>Test 4</div></div><div id = 'comments_area' class = 'col s4 m4 l4 4'>Comments Area</div><div></div></div>";
//var cart_dialog_html = "<div class = 'header grey lighten-4' style = 'margin:0px;padding:0px;'>      <div class = 'row' id = 'cart_tabs' style = 'height:100%;margin-top:0px;padding-top:0px;'>      <div id = 'cart_tab_items' class = 'col s2 m2 l2 2 light green valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>         <div>              <i class = 'material-icons amber lighten-2' style = 'border-radius:999px;padding:3%'> list </i>              <hr>               Товары            </div>          </div><div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>            <div>   <i class = 'material-icons amber lighten-2' style = 'border-radius:999px;padding:3%'> card_giftcard</i>              <hr>             Упаковка            </div>          </div>     <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>            <div>       <i class = 'material-icons amber lighten-2' style = 'border-radius:999px;padding:3%'>local_shipping</i>              <hr>               Доставка            </div>          </div>         <div id = 'cart_tab_pay' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>            <div>               <i class = 'material-icons amber lighten-2' style = 'border-radius:999px;padding:3%'> payment</i>              <hr>               Оплата            </div>          </div>                 <div id = 'cart_tab_submit' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>            <div>                      <i class = 'material-icons amber lighten-2' style = 'border-radius:999px;padding:3%'> done </i>              <hr>               Отслеживание            </div>          </div>                    </div>      <div id = 'cart_content' style = ''>         <div class = 'row'>            \                                               <div class = 'col s12 m12 l12 12 center-align white z-depth-1'>                 <h4 > Ваш заказ: </h4>                                           <h6 id = 'cart_items_counter'> Всего товаров: 24 </h6>                 <h5 id = 'cart_items_price'> На сумму: 670р.</h5>                                             * для выбора упаковки перейдите на следующий экран                      <div class = 'row ' style = 'display:inline'>                                                    <a class='waves-effect waves-light red btn' id = 'cart_back_button'><i class='material-icons left'>cancel</i>Назад</a>                                                            <a class='waves-effect waves-light btn' id = 'cart_next_button'><i class='material-icons left'>done</i>Далее</a>   </div>                                                                </di</div>                                                                <div class = 'col s12 m12 l12 12' style = 'overflow-y:auto; ' >                                                                    <table class = 'responsive-table highlight white z-depth-1' >                <thead>                  <tr class = 'white'>                                                                        <th data-field='id'>Фото</th>                    <th data-field='name'>Наименование</th>                    <th data-field='type'>Тип</th>                                                                            <th data-field='quantity'>количество</th>                    <th data-field='price'>цена</th>                  </tr>                                                                               <tbody id = 'cart_items_table'>                                                   </tbody>              </table>            </div>                                        </div></div>";
var item_object = new item_card();
item_object.item_template = item_template;


console.log(item_object.item_template);

function open_item(id)
{
  console.log(item_object.item_template);
  //catalog_object.open_item(id);
  item_object.open_item(id);
}
