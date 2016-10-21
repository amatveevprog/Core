//[========================== SHOPPING CART LOGIC ==========================]

function shopping_cart()
 {
   this.cart_dialog_items_html = '';

   this.cart_dialog_pack_html = '';
   this.cart_items = [];
   this.widget_placeholder_id = 'shopping_cart_wrapper';
   this.cart_widget_html = "<div class = 'col s3 m3 l3 3' class = 'cart_widget'><div><i class = ' material-icons' style = 'border-radius:999px;padding:30%;:90px; margin-top:20%'>shopping_cart</i></div></div><div class = 'col s8 m8 l8 8'><p style = 'color:white; margin-bottom:0px;margin-top:5%;font-size:140%'> корзина </p><hr style = 'margin:0px'><p id = 'shopping_cart_price' style = 'color:white; font-size:110% ; margin-top:0px; margin-bottom:0px; margin-left:5%'>корзина пуста</p></div>'";
   
   this.cart_sum = 0;
   this.cart_template = "<div class = 'header grey lighten-4' style = 'margin:0px;padding:0px;'> <div class = 'row' id = 'cart_tabs' style = 'height:100%;margin-top:0px;padding-top:0px;'><div id = 'cart_tab_items' class = 'col s2 m2 l2 2 light green valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'><div><i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> list </i><hr>Товары</div></div><div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'><div><i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> card_giftcard</i><hr>Упаковка</div></div><div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'><div><i class = 'material-icons ' style = 'border-radius:999px;padding:3%'>local_shipping</i><hr>Доставка</div></div><div id = 'cart_tab_pay' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'><div><i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> payment</i><hr>Оплата</div></div><div id = 'cart_tab_submit' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'><div><i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> done </i><hr>Отслеживание</div></div><div><hr><div id = 'cart_content'></div>";
   this.cart_item_id_counter = 0;

   //Not Used
   this.cart_packed_item = '';
   this.current_pack = '';
   //


   this.cart_selected_packs = [];


// ________________________CART_WIDGET_______________________________
this.draw_widget = function()
 {
   document.getElementById(this.widget_placeholder_id).innerHTML = this.cart_widget_html;
   //console.log('adding onclick function.....');
   document.getElementById(this.widget_placeholder_id).onclick = function(){cart_widget_click();};
 };


 //cart widget onclick
 this.widget_onclick = function()
 {
   //console.log('cart clicked');

   //this.shop_cart_dialog_items();
   document.getElementById('modal_content_cart').innerHTML = '';
   var cart_dialog_object = new cart_dialog_class(cart_dialog_object);
   cart_dialog_object.target = 'modal_content_cart';
   cart_dialog_object.cart_object = this;
   cart_dialog_object.init(cart_dialog_object);

   var modal_content = document.getElementById('modal_content_cart');
   $('#modal_cart').openModal();
   cart_full_screen();
 };
//________________________END_OF_CART_WIDGET_____________________________

// _______________________CART_LOGIC_______________________________________
   //add item to cart
   this.add_to_cart = function(item_id,items,selected_type,selected_quantity)
   {
     for(var i in items)
      {
        var new_item = new Object();
        if(items[i].id == item_id)
         {
           for(var key in items[i])
            {
              new_item[key] = items[i][key];
            }
           //new_item = items[i];

           new_item.selected_type =  selected_type;
           new_item.selected_quantity = selected_quantity;
           new_item.packed_quantity = 0;

           this.cart_item_id_counter = this.cart_item_id_counter + 1;
           new_item.cart_item_id = 'citem_N'+this.cart_item_id_counter;
           this.cart_items.push(new_item);
            window.localStorage['cart_object_cart_items'] =   JSON.stringify(this.cart_items);
           this.calculate_price();
             Materialize.toast('Товар добавлен в корзину. Для просмотра и оплаты заказа нажмите на значек корзины в правом углу', 4000);
           //console.log(this.cart_items);
           return('true');
         }
      }

   };

   //calculate summary price
   this.calculate_price = function()
    {
       this.cart_sum  = 0;
       for(var i in this.cart_items)
        {
           //Get the varian coefficient

           var coefficient = 1;
           for(var t in this.cart_items[i].variants)
            {
              if(this.cart_items[i].variants[t].name == this.cart_items[i].selected_type)
               {
                 coefficient = this.cart_items[i].variants[t].coefficient;
               }
            }
          this.cart_sum  = this.cart_sum + this.cart_items[i].price*this.cart_items[i].selected_quantity*coefficient;
            window.localStorage['cart_object_cart_sum'] = JSON.stringify(this.cart_sum);
        }

       if(this.cart_sum == 0)
        {
          document.getElementById("shopping_cart_price").innerHTML = 'корзина пуста';
        }
        else
        {
          document.getElementById("shopping_cart_price").innerHTML = this.cart_sum + ' рублей';
        }

    };

   
   
   //remove item from cart_items
   this.remove_from_cart = function(cart_item_id )
   {
     for(var i in this.cart_items)
      {
        if(this.cart_items[i].cart_item_id  == cart_item_id )
         {
           delete this.cart_items[i];
             this.calculate_price();
           window.localStorage['cart_object_cart_items'] =   JSON.stringify(this.cart_items);
           return('true');
         }
      }
   };



//_________________________END_OF_CART_LOGIC______________________________

//________________________DIALOG_________________________________________

//DIALOG / NEXT_SCREEN_BUTTON
  this.next_screen = function(screen_from)
   {
       switch (screen_from)
       {
         case "items":
          {
            //console.log('Go to screen pack');
            this.shop_cart_dialog_pack();

            break;
          }
        default:
         {
            console.log('not found');
            break;
         }
       }
   };
    //DIALOG / BACK_SCREEN_BUTTON
   this.back_screen = function(screen_from)
    {

    };

    //DIALOGG / ITEMS_SCREEN / SHOW
   this.shop_cart_dialog_items =  function()
   {

     var modal_content = document.getElementById('modal_content_cart');
     var html_str = this.cart_dialog_items_html;
     modal_content.innerHTML = html_str;


     //add items to grid
      var items_html =  "";
      for (var i in this.cart_items)
       {

        //update_modal_body
        items_html = items_html + "<tr id = '"+this.cart_items[i].cart_item_id+"'  class = 'center-align  hoverabl z-depth-1' style = 'padding:5%;'>";
        items_html  = items_html  +   "<td><img class ='circle' style = 'width:50px;height:50px' src ='" + this.cart_items[i].image_src  + "'></td>";
        items_html  = items_html  +   "<td class = 'truncate'><h5>" + this.cart_items[i].label + "</h5></td>";
        items_html  = items_html  +"<td style = 'font-size:120%'>"+this.cart_items[i].selected_type+"гр. </td>";
        items_html  = items_html  +" <td> <input placeholder='" +this.cart_items[i].selected_quantity+"'  type='text' class='validate' style = 'width:10%' value = '"+this.cart_items[i].selected_quantity+"'></td>";

        var result_price = 0;
       // console.log('id = ' + this.cart_items[i].id + 'Q = ' +  this.cart_items[i].selected_quantity + "Type = " +this.cart_items[i].selected_type);
        if(this.cart_items[i].type == 'tea')
         {
           var coefficient = 1;
           for(var t in this.cart_items[i].variants)
            {
              if(this.cart_items[i].variants[t].name == this.cart_items[i].selected_type)
               {
                 coefficient = this.cart_items[i].variants[t].coefficient;
               }
            }
          result_price = this.cart_items[i].selected_quantity*this.cart_items[i].price*coefficient;
         }
         else
           {
            result_price = this.cart_items[i].selected_quantity*this.cart_items[i].price;
           }

        items_html  = items_html  +"<td style = 'font-size:120%'>"+  result_price+" руб. </td>";
        items_html  = items_html  +" <td><a class='btn-floating btn-small waves-effect waves-light red' onclick = 'cart_dialog_delete_item("+'"' +this.cart_items[i].cart_item_id+'"'+")'><i class='material-icons'>delete</i></a></td></tr>";

       }
      var table = document.getElementById('cart_items_table');
      table.innerHTML = items_html;

     //update_modal_footer
     var modal_footer = document.getElementById('modal_footer_cart');
     var buttons_html = ' <a class="waves-effect waves-light btn" id = "cart_next_button" onclick = "cart_dialog_nextscreen('+ "'" +'items'+"'"+')"><i class="material-icons left">done</i>Далее</a> <a class="waves-effect waves-light red btn" id = "cart_back_button"><i class="material-icons left">cancel</i>Назад</a>';
     modal_footer.innerHTML = buttons_html;
     //add onclick to next and back buttons_html
    //document.getElementById("cart_next_button").onclick =  cart_dialog_nextscreen('items');
    //$('#modal_cart').openModal();




   };

//DIALOGG / ITEMS_SCREEN / SHOW
  this.cart_dialog_pack_show = function()
   {
     var modal_content = document.getElementById('modal_content_cart');
   };


 //DIALOG / ITEMS_SCREEN / DELETE ITEMS_SCREEN
  this.cart_dialog_delete_item = function(cart_item_id_screen)
   {
     //console.log('trying to remove element id = ' + cart_item_id_screen);
      var item_row_id = '' +  cart_item_id_screen;
     //console.log('Delete item cart_item_id = ' + cart_item_id);
      this.remove_from_cart(cart_item_id_screen);
      var tablediv = document.getElementById('cart_items_table');
      var item_to_delete = document.getElementById(cart_item_id_screen);
      tablediv.removeChild(item_to_delete);
      return('true');


 };

// > DIALOG_PACKS

     //DIALOGG / PACK_SCREEN / SHOW

 this.shop_cart_dialog_pack = function()
 {
   var cart_dialog_logic_div  = document.getElementById('cart_content');
   cart_dialog_logic_div.innerHTML = this.cart_dialog_pack_html;


   var div0  = document.getElementById('cart_dialog_pack_primary');
   var div1  = document.getElementById('cart_dialog_pack_1stage');
   var div2  = document.getElementById('cart_dialog_pack_2stage');
   var div3  = document.getElementById('cart_dialog_pack_3stage');
   var div4  = document.getElementById('cart_dialog_pack_4stage');
   div0.style.display = 'block';
   div0.innerHTML = '<h4> Выберите упаковку </h4>';
   div0.innerHTML += '<div class = "row center-align">';
   div0.innerHTML += '<a class="waves-effect waves-light btn">пропустить</a>';
   div0.innerHTML += '<a class="waves-effect waves-light btn" onclick = "cart_object.dialog_pack_choose_item ()">Добавить упаковку</a>';
   div0.innerHTML += '</div>';


 };
   //DIALOGG / PACK_SCREEN /choose item
   this.dialog_pack_choose_item = function()
    {
      //labels
      var div_label_1 = document.getElementById('cart_dialog_pack_1stage_label');
      var div_label_2 = document.getElementById('cart_dialog_pack_2stage_label');
      var div_label_3 = document.getElementById('cart_dialog_pack_3stage_label');
      var div_label_4 = document.getElementById('cart_dialog_pack_4stage_label');

      div_label_1.style.display = 'block';
      div_label_1.innerHTML = '<h4> Шаг 1: Выбор товара для упаковки </h4>';
      div_label_2.style.display = 'none';
      div_label_2.innerHTML = '';
      div_label_3.style.display = 'none';
      div_label_3.innerHTML = '';
      div_label_4.style.display = 'none';
      div_label_4.innerHTML = '';
      //end labels


      //console.log('good');
      var div1  = document.getElementById('cart_dialog_pack_1stage');
      div1.style.display = 'block';


      var htmlstr = '<hr>';
      htmlstr += '<div class = "col s12 m6 l6 6"><select id = "choosed_item" class="icons" onchange = "cart_object.dialog_pack_choose_quantity ()" ><option value="disabled" disabled selected>выбор товара  </option>';
      for(var i in this.cart_items)
       {
          if(this.cart_items[i].packed_quantity < this.cart_items[i].selected_quantity)
           {
             var max_pack_quantity = this.cart_items[i].selected_quantity - this.cart_items[i].packed_quantity;
              htmlstr += '<option data-packattribute= "" value="'+this.cart_items[i].cart_item_id+'" data-icon="'+this.cart_items[i].image_src+'" class="circle">'+this.cart_items[i].name+' / '+ this.cart_items[i].selected_type+' / доступно для упаковки: ' + max_pack_quantity +' шт.'+'</option>';
           }
       }
      htmlstr +='</select></div>';
      htmlstr +='<div class = "col s6 m6 l6 6" id = "select_pack_quantity_div" style = "s"></div>';
      div1.innerHTML = htmlstr;
      $('select').material_select();
    };

    //DIALOGG / PACK_SCREEN /choose quantity
      this.dialog_pack_choose_quantity = function()
       {

        // console.log('ok!');
         var choosed_item = document.getElementById("choosed_item").value;

         var div3  = document.getElementById('cart_dialog_pack_3stage');
         var div4  = document.getElementById('cart_dialog_pack_4stage');

         //labels
         var div_label_1 = document.getElementById('cart_dialog_pack_1stage_label');
         var div_label_2 = document.getElementById('cart_dialog_pack_2stage_label');
         var div_label_3 = document.getElementById('cart_dialog_pack_3stage_label');
         var div_label_4 = document.getElementById('cart_dialog_pack_4stage_label');


         div_label_2.style.display = 'none';
         div_label_2.innerHTML = '';
         div_label_3.style.display = 'none';
         div_label_3.innerHTML = '';
         div_label_4.style.display = 'none';
         div_label_4.innerHTML = '';
         //end labels




         div3.innerHTML = '';
         div4.innerHTML = '';
         div3.style.display = 'none';
         div4.style.display = 'none';

         if(choosed_item != "disabled")
           {
              document.getElementById("select_pack_quantity_div").innerHTML = '<input id="selected_pack_quantity"  type="number" class="validate" onchange = "cart_object.dialog_pack_choose_pack()"><label for="selected_pack_quantityl"> количество для упаковки </label>';
           }
           else {
             document.getElementById("select_pack_quantity_div").innerHTML ='выберите товар для упаковки';
           }
       };
//DIALOGG / PACK_SCREEN /choose PACK_SCREEN
       this.dialog_pack_choose_pack = function()
        {
          //labels

          var div_label_2 = document.getElementById('cart_dialog_pack_2stage_label');
          var div_label_3 = document.getElementById('cart_dialog_pack_3stage_label');
          var div_label_4 = document.getElementById('cart_dialog_pack_4stage_label');


          div_label_2.style.display = 'block';
          div_label_2.innerHTML = '<h4>Шаг 2: Выбор упаковки</h4>';
          div_label_3.style.display = 'none';
          div_label_3.innerHTML = '';
          div_label_4.style.display = 'none';
          div_label_4.innerHTML = '';
          //end labels

          // 1) check for selected quantity
          var packing_quantity = document.getElementById("selected_pack_quantity").value;
          var choosed_item_id = document.getElementById("choosed_item").value;
          var max_quantity = 0;
          //block for logic
          var div3  = document.getElementById('cart_dialog_pack_3stage');

          var div4  = document.getElementById('cart_dialog_pack_4stage');


          div4.innerHTML = '';
          div4.style.display = 'none';

          for(var i in this.cart_items)
           {
             if(this.cart_items[i].cart_item_id == choosed_item_id )
              {
                var packed_item = this.cart_items[i];
                this.cart_packed_item = packed_item;
                 max_quantity =  this.cart_items[i].selected_quantity - this.cart_items[i].packed_quantity;
                break;
              }
           }

           if(packing_quantity != null)
            {
                  if(packing_quantity <=  max_quantity)
                   {
                     //packs Logic
                     var available_packs = [];
                     for(var j in catalog_object.packs.array)
                      {
                         var pack_validity_flag = 0;
                         for(var t in catalog_object.packs.array[j].item_types)
                         {
                           //console.log('compare item: type = '+ this.cart_packed_item.type+'  variant = '+this.cart_packed_item.selected_type+' VS pack type = '+catalog_object.packs.array[j].item_types[t].item_type +  ' variant =  '+catalog_object.packs.array[j].item_types[t].item_variant);
                           if((catalog_object.packs.array[j].item_types[t].item_type == this.cart_packed_item.type) && (catalog_object.packs.array[j].item_types[t].item_variant == this.cart_packed_item.selected_type))
                            {
                              pack_validity_flag = pack_validity_flag + 1;
                              //console.log('Yes! flag = ' + pack_validity_flag);
                            }

                         }
                        if (pack_validity_flag > 0)
                         {
                           available_packs.push(catalog_object.packs.array[j]);
                         }
                         {
                           //console.log('no available packs for this');
                           //Materialize.toast('Для товара нет доступных упаковок', 4000);

                           // to add here smtth for indication
                           //return;
                         }

                      }
                      //Done we have array of availavle packs
                      //console.log(available_packs);

                      //lets start to create a html for packs
                      var packs_html = '<div class = "col s12 m12 l12 12"><form action = "#">';
                      for (var k in available_packs)
                       {
                          //packs_html += '<div><p> <input onchange = "cart_object.dialog_pack_choose_variant('+"'"+available_packs[k].pack_id +"'"+')"  name="packs" type="radio" id="pack'+ available_packs[k].pack_id +'" /><label for="pack'+available_packs[k].pack_id+'">'+available_packs[k].name+'</label> <img src = "'+available_packs[k].image+'"></img> </div>';
                          packs_html +="<div class = 'col s12 m3 l3 3'><div class='card small'> <div class='card-image waves-effect waves-block waves-light'><img class='activator' src='"+available_packs[k].image+"'> </div>";
                          packs_html +="<div class='card-content'><span class='card-title activator truncate grey-text text-darken-4'>"+available_packs[k].name+"<i class='material-icons right'>more_vert</i></span>";
                          //packs_html +="<input onchange = 'cart_object.dialog_pack_choose_variant("+'"'+available_packs[k].pack_id +'"'+")'  name='packs' type='radio' id='pack"+ available_packs[k].pack_id +"' /><label for='pack"+available_packs[k].pack_id+'">'+available_packs[k].name+"</label></div>";
                          packs_html += '<div><p> <input onchange = "cart_object.dialog_pack_choose_variant('+"'"+available_packs[k].pack_id +"'"+')"  name="packs" type="radio" id="pack'+ available_packs[k].pack_id +'" /><label for="pack'+available_packs[k].pack_id+'"> Выбрать</label> </div></div>';

                          packs_html +=" <div class='card-rгж.al'><span class='card-title grey-text text-darken-4'>Card Title<i class='material-icons right'>close</i></span>";
                          packs_html +="<p>Here is some more information about this product that is only revealed once clicked on.</p>";
                          packs_html +="<p>Here is some more information about this product that is only revealed once clicked on.</p>";
                          packs_html +="</div></div></div>";

                       }
                       div3.innerHTML = '</form></div>' + packs_html;
                       div3.style.display = 'block';
                   }
                   else
                   {
                         //alert('too much...you can select max = ' +max_quantity );
                         div3.innerHTML = '';
                         div3.style.display = 'none';
                         Materialize.toast('максимальное количество этого товара, доступное для упаковки = ' + max_quantity, 4000);
                          //div3.innerHTML = '<p>маскимальное количество этого товара, доступное для упаковки  = '+ max_quantity +'</p> ';
                   }
            }
            else
            {
              div3.innerHTML = '<p>выберите количество</p> ';
              div3.style.display = 'block';
            }
        };


//DIALOGG / PACK_SCREEN /choose PACK VARIANT
this.dialog_pack_choose_variant = function(pack_id)
 {
   //labels
   var div_label_3 = document.getElementById('cart_dialog_pack_4stage_label');
   div_label_3.style.display = 'block';
   div_label_3.innerHTML = '<h4> Шаг 4: Выбор варианта </h4>';
   //end labels

   // Find proper pack
   var html_str = "<div class = 'row'>";
    for(var i in catalog_object.packs.array)
     {
       if(catalog_object.packs.array[i].pack_id == pack_id)
        {
          // for all the variants to add packs to html string
          for(var j in catalog_object.packs.array[i].variants)
           {
             html_str += "<div class = 'col s12 m4 l3 3 cart_dialog_packs_variant_item waves-effect waves-light' id = 'pack_variant"+catalog_object.packs.array[i].variants[j].id+"' onclick = 'cart_object.dialog_pack_comlete("+'"'+catalog_object.packs.array[i].variants[j].id+'"'+")'><img src = '"+catalog_object.packs.array[i].variants[j].image+"' style = 'height:150px;' ></img></div>";
           }
        }
     }

     html_str += '</div><div id = "pack_complete_div" style = "margin-top:5%;"></div>';
     var div4  = document.getElementById('cart_dialog_pack_4stage');

     //Add packs_html to screen
     div4.innerHTML = html_str;
     div4.style.display = 'block';

 };
   //DIALOGG / PACK_SCREEN / Show add pack button + highlight the choosen
   this.dialog_pack_comlete = function(selectedid)
    {
      // Visual part
        //Choose pack variant visual
        var items = document.getElementsByClassName('cart_dialog_packs_variant_item');
        //Adjust pack id technical -> visual

        //get pack_varian_items
        var selected_html_id = 'pack_variant'+selectedid;

        //iterate
        for (var i in items)
        {
          if(selected_html_id == items[i].id)
           {
             items[i].style = 'background:#c5e1a5';
           }
           else
           {
             items[i].style = 'background:white';
           }
        }

      //Show add pack info
      var html_str = '';
      html_str +='<hr> <h5>упаковка выбрана</h5><a onclick = "cart_object.dialog_pack_add_pack()" class="waves-effect waves-light btn">Добавить выбранную упаковку</a>' ;
      html_str += '<a class="waves-effect waves-light btn">Отмена</a>';
      var pack_complete_div = document.getElementById('pack_complete_div');
      pack_complete_div.innerHTML = html_str;
    };

    //DIALOGG / PACK_SCREEN / add_pack to cart and array
    this.dialog_pack_add_pack = function()
     {

     };

    //DIALOG / PACK_SCREEN / PAINT PACK GRID
    this.dialog_pack_paint_pack_grid = function()
     {

     };
}


//init_cart
//var cart_object = new shopping_cart();
//cart_object.draw_widget();

//add_to_cart
function add_to_cart(item_id)
 {
   //console.log('ok, starting adding to cart....');
   var selected_type  = document.getElementById('item_card_options_type').value;
   var selected_quantity = document.getElementById('item_card_options_quantity').value;
   //console.log('nice stype = ' + selected_type  + ' quantity = ' + selected_quantity);
   cart_object.add_to_cart(item_id,catalog_object.items,selected_type,selected_quantity);

    // 2) send item to cart
 }


 //cart on click
function cart_widget_click()
{
  cart_object.widget_onclick();
}




//CART_DIALOG
/*
var cart_dialog_tabs_html = "<div class = 'header grey lighten-4' style = 'margin:0px;padding:0px;'>  <div class = 'row' id = 'cart_tabs' style = 'height:100%;margin-top:0px;padding-top:0px;'>    <div id = 'cart_tab_items' class = 'col s2 m2 l2 2 light green valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>          <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> list </i>          <hr>          Товары      </div>    </div>    <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>         <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> card_giftcard</i>         <hr>         Упаковка      </div>    </div>    <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>         <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'>local_shipping</i>         <hr>Доставка      </div>    </div>    <div id = 'cart_tab_pay' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>         <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> payment</i>         <hr>         Оплата      </div>    </div>      <div id = 'cart_tab_submit' class = 'col s2 m2 l2 2 white valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>        <div>          <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> done </i>          <hr>          Отслеживание        </div>      </div>      <div>        <hr>        <div id = 'cart_content'>                   </div>      </div>    </div>";



var cart_dialog_items_html ="<div class = 'header grey lighten-4' style = 'margin:0px;padding:0px;'>  <div class = 'row' id = 'cart_tabs' style = 'height:100%;margin-top:0px;padding-top:0px;'>    <div id = 'cart_tab_items' class = 'col s2 m2 l2 2 light green valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%;'>      <div>          <i class = 'material-icons ' style = 'border-radius:999px;padding:3%'> list </i>          <hr>          Товары      </div>    </div>    <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2 valign-wrapper hoverable waves-effect waves-yellow center-align z-depth-1' style = 'height:100px; padding:1%;background:#FAFAFA'>      <div>         <i class = 'material-icons  z-depth-1' style = 'border-radius:999px;padding:3%'> card_giftcard</i>         <hr>         Упаковка      </div>    </div>    <div id = 'cart_tab_pack' class = 'col s2 m2 l2 2  valign-wrapper hoverable waves-effect waves-yellow center-align z-depth-1' style = 'height:100px; padding:1%;background:#FAFAFA'>      <div>         <i class = 'material-icons  z-depth-1' style = 'border-radius:999px;padding:3%'>local_shipping</i>         <hr>Доставка      </div>    </div>    <div id = 'cart_tab_pay' class = 'col s2 m2 l2 2 valign-wrapper hoverable waves-effect waves-yellow center-align' style = 'height:100px; padding:1%; background:#FAFAFA'>      <div>         <i class = 'material-icons  z-depth-1' style = 'border-radius:999px;padding:3%;background:#FAFAFA'> payment</i>         <hr>         Оплата      </div>    </div>      <div id = 'cart_tab_submit' class = 'col s2 m2 l2 2  valign-wrapper hoverable waves-effect waves-yellow center-align z-depth-1' style = 'height:100px; padding:1%; background:#FAFAFA'>        <div>          <i class = 'material-icons  z-depth-1' style = 'border-radius:999px;padding:3%'> done </i>          <hr>          Отслеживание        </div>      </div>      <div>        <hr>        <div id = 'cart_content'>           <div class = 'row' style = ''> <div class = 'col s12 m12 l12 12 center-align purple lighten-4' id = 'cart_dialog_order_summary' style = 'margin-top:3%; background:#FAFAFA; margin-bottom:3%; padding:2%; background:#FAFAFA'>                 <h4 > Ваш заказ: </h4>                                           <h6 id = 'cart_items_counter'> Всего товаров: 24 </h6>                 <h5 id = 'cart_items_price'> На сумму: 670р.</h5>                                             * для выбора упаковки перейдите на следующий экран      </div>                                                                <div class = 'col s12 m12 l12 12 z-depth-1' style = ' background:#FAFAFA;padding:3%' >   <table class = 'responsive-table highlight striped' style = 'background:#FAFAFA; z-depth-1; padding:2%;'>                <thead>                  <tr>   <th data-field='id'>Фото</th>                    <th data-field='name'>Наименование</th>                    <th data-field='type'>Тип</th>                                                                            <th data-field='quantity'>количество</th>                    <th data-field='price'>цена</th>                  </tr>                                                                               <tbody id = 'cart_items_table'>                                                   </tbody>              </table>            </div>                                        </div>        </div>      </div>    </div>";



var cart_dialog_pack_html = "<div class = 'center-align'><div id = 'cart_dialog_pack_primary' class = 'col s12 m12 l12 12 z-depth-1' style = 'padding:3%; margin-top:3%; margin-bottom:1%;'></div><div id = 'cart_dialog_pack_1stage_label' class = 'left-align col s12 m12 l12 12 grey-text darken-2-text' style = 'margin:1%'></div><div id = 'cart_dialog_pack_1stage' style= 'margin-top:1%; margin-bottom:1%; background:#FAFAFA; display:none' class = 'cart_dialog_screen_pack white col s12 m12 l12 12 z-depth-1'></div><div id = 'cart_dialog_pack_2stage_label' class = 'left-align col s12 m12 l12 12 grey-text darken-2-text' style = 'margin:1%' ></div><div style= 'margin-top:1%;margin-bottom:1%; padding:2%; display:none'  id = 'cart_dialog_pack_2stage' class = 'cart_dialog_screen_pack col s12 m12 l12 12 white z-depth-1'></div><div id = 'cart_dialog_pack_3stage_label' class ='left-align col s12 m12 l12 12 grey-text darken-2-text' style = 'margin:1%'></div><div style= 'margin-top:1%;margin-bottom:1%; padding:2%;display:none'    id = 'cart_dialog_pack_3stage' class = 'cart_dialog_screen_pack col s12 m12 l12 12 white z-depth-1'></div><div id = 'cart_dialog_pack_4stage_label' class = 'left-align col s12 m12 l12 12 grey-text darken-2-text' style = 'margin:1%' ></div><div id = 'cart_dialog_pack_4stage'  style= 'margin-top:1%; margin-bottom:1%;padding:2%;display:none'  class = 'cart_dialog_screen_pack col s12 m12 l12 12 white z-depth-1'></div><div id = 'cart_dialog_pack_pack_grid'  style= 'margin-top:1%;padding:2%;display:none'  class = 'cart_dialog_screen_pack col s12 m12 l12 12 white z-depth-1'></div></div>";

cart_object.cart_dialog_tabs_html = cart_dialog_tabs_html;
cart_object.cart_dialog_items_html = cart_dialog_items_html;
cart_object.cart_dialog_pack_html = cart_dialog_pack_html;
*/
//CART DIALOG / DELETE_ITEM
function cart_dialog_delete_item (cart_item_id)
{
   cart_object.cart_dialog_delete_item (cart_item_id);
}

//CART DIALOG / NEXT screen
function cart_dialog_nextscreen(screen)
{
  //console.log('ok ! ! !');
  cart_object.next_screen(screen);
}


//CART FULL SCREEN ADJUSTMENT
function cart_full_screen()
{
  document.getElementById('modal_cart').style.bottom = '10%';
}
