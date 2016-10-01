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


function open_item(id)
{
  console.log(item_object.item_template);
  //catalog_object.open_item(id);
  item_object.open_item(id);
}
