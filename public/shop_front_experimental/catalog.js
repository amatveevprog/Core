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
    this.partially_paint_batch_size = 10;
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
                  var this_ref = this;
                  this.partially_paint_init(scroll_block,this_ref);
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
  this.partially_paint_init = function(scroll_block,this_ref)
  {

      scroll_block.addEventListener('scroll',function(e){
          var check = scroll_block.scrollHeight-scroll_block.clientHeight - scroll_block.scrollTop;
          //console.log('qweqwe'+window.scrollTop+' ' + window.height+' ' +document.height+' ' +window.pageYOffset+'Scroll event.  Check = ' +check +'  ' + scroll_block.scrollHeight + '  ' + scroll_block.clientHeight + '  '+ scroll_block.scrollTop);

          if((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
          {
              this_ref.partially_paint_paint_new_batch(scroll_block);
          }
      });

  }

   // paint new_portion
   this.partially_paint_paint_new_batch = function(scroll_block)
    {
        //console.log('lets_paint' );
        var items_area = document.createElement('div');


        for(var i = this.partially_paint_batch_size * this.partially_position; i<=this.filtered_items.length; i++)
        {
            //console.log('lets paint item!' );
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
     item_container_div.className = 'col s12 m6 l4 4 hoverable';
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

      //console.log('start search wirh fasset = '+faset_array);
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
               // console.log('lets compare ' + this.items[i].type + '  vs  '+selected_type);
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
             //paint_item(this.items[i],this.tile_item_template);
           }

      }
        this.Count_current_categories();
        this.paint_all_items();
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
   //console.log('start updating ' + this.categories.length);
   for (var i in this.categories)
   {
     //console.log('lets update ' + this.categories[i].id);
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
    this.open_item_by_obj_id = function(obj_id)
    {
        // Get all the item_by_id
        var item;
        var item_id;
        for(var i in this.items)
        {
            if(this.items[i]._id == obj_id)
            {
                item = this.items[i];
                item_id = this.items[i].id;
            }
        }

        // Test vreateion of full height modal

        var modal_content = document.getElementById('modal_content');
        modal_content.innerHTML = '<div> <h1>' + item_id +'</h1>'+ item.image_src+item.label+'</div>';
        $('#modal_window').openModal();

    };
//-------Catalog-----Session

}



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

