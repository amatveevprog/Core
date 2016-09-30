//[========================Product Catalog LOGIC==========================]




function catalog()
{

  //templates
   this.tile_item_template = '';
  //main array of all elements
   
   this.categories = [];
   this.items = [];
   this.filtered_items = [];
   this.packs = [];
   
   //Categories 
   this.categories = [];
   this.categories_template = '';

    //partially paint batch size
    this.partially_paint_batch_size = 20;
    this.partially_paint_array_to_paint = [];
    this.partially_position = 1;

// Catalog _ Tiles
// Paint all items
  this.paint_all_items = function()
   {
     for(var i in this.filtered_items)
      {
          if(i>=this.partially_paint_batch_size)
          {
              if(this.filtered_items.length >20)
              {
                  var scroll_block = window;
                  this.partially_paint_init(scroll_block);
              }
              return('true');
          }
        var item = this.filtered_items[i];
        var items_area = document.createElement('div');

        paint_item(item,this.tile_item_template,items_area);

      }
   };


   //  [========  Partually_Paint   ==============]
    //scroll bottom
  this.partially_paint_init = function(scroll_block)
  {
      document.getElementById('items_container').addEventListener('scroll',function(e){

          if(scroll_block.scrollTop == scroll_block.scrollHeight-scroll_block.clientHeight)
          {
              this.partially_paint_paint_new_batch(scroll_block);
          }
      });

  }

   // paint new_portion
   this.partially_paint_paint_new_batch = function(scroll_block)
    {
        var items_area = document.createElement('div');
        for(var i = this.partially_paint_batch_size * this.partially_position; i<=this.filtered_items;i++)
        {
            var item = this.filtered_items[i];

            if(i>this.partially_paint_batch_size * this.partially_position+this.partially_paint_batch_size)
            {
                this.partially_position = this.partially_position + 1;
                return('true');
            }
            paint_item(item, this.tile_item_template, items_area);
        }
    }


  //Paint_Item
  function paint_item(item,item_template)
   {
     var image_src = item.image_src;
     var label = item.label;
     var price = item.price;
     var id = item.id;
     var item_container_div = document.createElement('div');
     item_container_div.className = 'col s12 m6 l4 4';
     item_container_div.id = id;  
    
     var element_html = item_template;
     element_html = element_html.replace("&catalog_tile_image_src&", image_src);
     element_html = element_html.replace("&catalog_tile_label&",label);
     element_html = element_html.replace('&catalog_tile_open_item&',id);
     element_html = element_html.replace('&catalog_tile_price&',price);
  
     item_container_div.innerHTML = element_html;
     item_container_div.style.opacity = 0.3;
     document.getElementById('items_area').appendChild(item_container_div);
     
     //ANIMATION
     TweenLite.to(item_container_div, 1, {opacity:1});
   }


 //search in all items_area
 this.search = function(faset_array,selected_type)
  {

      console.log('start search wirh fasset = '+faset_array);
     //erase array
      this.filtered_items = [];
      document.getElementById('items_area').innerHTML = '';
      //iterate through all the items
     for (var i in this.items)
      {

        var fassets_flag = 0;
        for(var j in faset_array)
         {
           var check_category_flag = 0;
           for(var c in this.items[i].categories)
            {
                // To be optimized!!! move up to prevent additional clooping
                console.log('lets compare ' + this.items[i].type + '  vs  '+selected_type);
              if(this.items[i].categories[c] == faset_array[j])
               {
                  check_category_flag = check_category_flag + 1;
               }
            }
            //check if fasset is passed
            if(check_category_flag != 0)
             {
              fassets_flag  = fassets_flag  + 1;
             }
         }
          //check if all the fassets are applicable
          if ((fassets_flag  == 0)&&(this.items[i].type==selected_type))
           {
             this.filtered_items.push(this.items[i]);
             paint_item(this.items[i],this.tile_item_template);
           }

      }
        this.Count_current_categories();
  };

  // Count_current_categories
  this.Count_current_categories = function()
  {

    //release all categories
    for(var i in this.categories)
    {
      this.categories[i].count = 0;
    }

      //start counting
      for(var j in this.categories)
      {
          for(var c in this.items)
           {
              //Check selected_type

             //iterate through categories in items

              for(var t in this.items[c].categories)
              {
                if(this.items[c].categories[t] == this.categories[j].id)
                 {
                   this.categories[j].count = this.categories[j].count + 1;
                 }
              }

           }
      }

   //RUN UPDATE categories
   //this.Update_Categories();
  };

//

this.Update_Categories = function()
 {
   console.log('start updating ' + this.categories.length);
   for (var i in this.categories)
   {
     console.log('lets update ' + this.categories[i].id);
     var category_checker = document.getElementById(this.categories[i].id);


      var category_label = document.getElementById('label_'+this.categories[i].id);
      category_label.innerHTML = this.categories[i].name + ' (' + this.categories[i].count + ')';

   }

 };


//INIT draw categories

//-------ITEM CARD SECTION-------
this.open_item = function(item_id)
 {
  // Get all the item_by_id
  var item;
  for(var i in this.items)
   {
     if(this.items[i].id == item_id)
      {
        item = this.items[i];
      }
   }

  // Test vreateion of full height modal

  var modal_content = document.getElementById('modal_content');
  modal_content.innerHTML = '<div> <h1>' +item_id +'</h1>'+ item.image_src+item.label+'</div>';
  $('#modal_window').openModal();

};
//-------Catalog-----Session

}





//______________________fasset_search__________________________
function start_fasset_search()
 {

   var pre_fasset_array = [];
   var faset_array = [];



   var t1_value = document.getElementById('category_green');
   var t2_value = document.getElementById('category_red');
   var t3_value = document.getElementById('category_ulyn');
   var t4_value = document.getElementById('category_puerh');

   var t5_value = document.getElementById('category_china');
   var t6_value = document.getElementById('category_india');
   var t7_value = document.getElementById('category_japan');
   var t8_value = document.getElementById('category_srilanka');

   pre_fasset_array.push(t1_value);
   pre_fasset_array.push(t2_value);
   pre_fasset_array.push(t3_value);
   pre_fasset_array.push(t4_value);
   pre_fasset_array.push(t5_value);
   pre_fasset_array.push(t6_value);
   pre_fasset_array.push(t7_value);
   pre_fasset_array.push(t8_value);

 console.log(pre_fasset_array);
   for (var i in pre_fasset_array)
    {
      console.log(i);
       if(pre_fasset_array[i].checked == false)
        {
          console.log('!');
          faset_array.push(pre_fasset_array[i].id);
        }
    }

   //console.log(faset_array);
   catalog_object.search(faset_array);


 }






//INIT catalog
var catalog_object = new catalog();






//верстальшик сделал больше строк

var element_html_template = '<div class="card" style = "width:235px; max-height:365px;">' +
    '<div class="card-image waves-effect waves-block waves-light">   ' +
    '<img id = "catalog_tile_image_src" class="activator" src="'
       + " &catalog_tile_image_src&" + '" style = "height: 200px; width:235px">     </div>' +
    '<div class="card-content"><span id = "catalog_tile_label"  class="card-title activator truncate grey-text text-darken-4">'
       + "&catalog_tile_label&"+'<br><i class="material-icons right">more_vert</i></span> <div class = "row"><div class = "col m19 s9 l9 9"><p><a id = "catalog_tile_open_item" class="waves-effect waves-light btn" style="width:145px; text-align: left;" onclick = "open_item('
       + "&catalog_tile_open_item&"+')">ПОДРОБНЕЕ</a></p></div><div class = "col m8 s3 l3 3"><h6 id = "catalog_tile_price" style="font-size: 130%">'
       +"&catalog_tile_price&"+ '</h6></div></div></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span><p>Here is some more information about this product that is only revealed once clicked on.</p></div> </div>';

catalog_object.tile_item_template = element_html_template;






//Categories_STAB
 var categories_json = {"categories":[{"name":"Зеленые", "count":0, "id":"category_green", "type":"teatype"},
                                      {"name":"Красные", "count":0, "id":"category_red", "type":"teatype"},
                                      {"name":"Улуны",   "count":0, "id":"category_ulyn", "type":"teatype"},
                                      {"name":"Пуеры",   "count":0, "id":"category_puerh", "type":"teatype"},
                                      {"name":"Китай",   "count":0, "id":"category_china", "type":"country"},
                                      {"name":"Япония",   "count":0, "id":"category_japan", "type":"country"},
                                      {"name":"Индия",   "count":0, "id":"category_india", "type":"country"},
                                      {"name":"Шри-ланка",   "count":0, "id":"category_srilanka", "type":"country"},
                                    ]};





for (var i in categories_json.categories)
 {
    catalog_object.categories.push(categories_json.categories[i]);
 }






//End of Categories Stab

// PIN CATEGORY SIDE BAR
 function category_pin()
  {
    var category_div = document.getElementById('category_sidebar');
    category_div.className = 'pinned';
    var button = document.getElementById('category_pin_button');
    button.innerHTML = 'открепить';
     button.onclick = function(){category_unpin();};
  }

  // UNPIN CATEGORY SIDE BAR
 function category_unpin()
 {
   var category_div = document.getElementById('category_sidebar');
   category_div.className = '';
   var button = document.getElementById('category_pin_button');
   button.innerHTML = 'закрепить';
   button.onclick = function(){category_pin();};
 }
//END_PIN


//____PACKING_STUB____
//pack objects
var packs_json = {'array':[{"pack_id":"1",
 "pack_flag" : true,
 "price":"100",
 "pack_description":"хорошая упаковка подойдет для всего",
 "name":"пакетики 100 гр.",
 "image":"http://teatime.esy.es/wp-content/uploads/2015/05/a79da84207e0db6b72954b5cb8534bf8.png",
 "item_types":[{"name":"пакетики","item_type":"tea","item_variant":"100"}],
 "variants":[{"id":"1","name":"красный","image":"http://teatime.esy.es/wp-content/uploads/2015/05/a79da84207e0db6b72954b5cb8534bf8.png"},
             {"id":"2","name":"синий","image":"http://teatime.esy.es/wp-content/uploads/2015/05/99fe7fbc60a1778755ba43fae76c1dc5.png"}]
           },

  {"pack_id":"2",
            "pack_flag" : true,
            "price":"200",
            "pack_description":"хорошая упаковка подойдет для всего",
            "name":"пакетища 500 гр.",
            "image":"http://teatime.esy.es/wp-content/uploads/2015/05/502517fb39b08b25d6f48ab6cd63ecc1.png",
            "item_types":[{"name":"пакетики","item_type":"tea","item_variant":"250"},{"name":"пакетища","item_type":"tea","item_variant":"500"}],
            "variants":[{"id":"1","name":"красный","image":"http://teatime.esy.es/wp-content/uploads/2015/05/9167eea9fe5397561070f449d92050b3.png"},
                        {"id":"2","name":"синий","image":"http://teatime.esy.es/wp-content/uploads/2015/05/a2a6e5ccf4128048255d0a0f682def84.png"}]
                      },
     {"pack_id":"3",
               "pack_flag" : true,
               "price":"210",
               "pack_description":"хорошая упаковка 2 подойдет для всего",
               "name":"пакет 601 гр.",
               "image":"http://teatime.esy.es/wp-content/uploads/2015/05/a2a6e5ccf4128048255d0a0f682def84.png",
               "item_types":[{"name":"пакетики","item_type":"tea","item_variant":"250"},{"name":"пакетища","item_type":"tea","item_variant":"500"}],
               "variants":[{"id":"1","name":"красны23й","image":"http://teatime.esy.es/wp-content/uploads/2015/05/9167eea9fe5397561070f449d92050b3.png"},
                           {"id":"2","name":"синий23","image":"http://teatime.esy.es/wp-content/uploads/2015/05/a2a6e5ccf4128048255d0a0f682def84.png"}]
                         },
                         {"pack_id":"4",
                                   "pack_flag" : true,
                                   "price":"300",
                                   "pack_description":"Ништячек упаковка",
                                   "name":"Нормальная упаковка.",
                                   "image":"http://teatime.esy.es/wp-content/uploads/2015/05/9167eea9fe5397561070f449d92050b3.png",
                                   "item_types":[{"name":"пакетища","item_type":"tea","item_variant":"500"}],
                                   "variants":[{"id":"1","name":"красны223232323й","image":"http://teatime.esy.es/wp-content/uploads/2015/05/a79da84207e0db6b72954b5cb8534bf8.png"},
                                               {"id":"2","name":"син234234242ий","image":"http://teatime.esy.es/wp-content/uploads/2015/05/a79da84207e0db6b72954b5cb8534bf8.png"}]
                                             }]
};



//to remove after test
catalog_object.packs = packs_json;




