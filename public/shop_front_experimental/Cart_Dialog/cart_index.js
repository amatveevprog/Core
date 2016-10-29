j/**
 * Created by alexander.bondarik on 14.10.2016.
 */

function cart_dialog_class(object_ref)
{
    this.header_objects_array = [];
    this.target = '';
    this.cart_object;

 this.init = function(object_ref)
 {
   var dialog_layout = document.createElement('div');
   var header_div = document.createElement('div');
   header_div.id = 'cart_dialog_header_area';
   var header_render = new object_ref.component_header();
   var header_object = header_render.draw_header(object_ref);
   header_div.appendChild(header_object);
   var body_div = document.createElement('div');
   body_div.id = 'cart_dialog_body_area';

   var screen_1_render = new object_ref.component_screen_1(object_ref);
   screen_1_render.parent_object = object_ref;
   var screen_1_object = screen_1_render.init(object_ref);
   body_div.appendChild(screen_1_object);
   dialog_layout.appendChild(header_div);
   var hr_div = document.createElement('div');
   dialog_layout.appendChild(body_div);
   document.getElementById(object_ref.target).appendChild(dialog_layout);


 };
    
 //refresh
// Header 
 this.component_header = function()
 {
   this.elements = {
     elements:
     [
         {
             number:"1",
             title_big:"Корзина",
             title_small:"Проверить корзину"
         },
         {
             number:"2",
             title_big:"Доставка и Метод оплаты",
             title_small:"Введите тип доставки и Метод оплаты"
         },
         {
             number:"3",
             title_big:"Подтверждение заказа",
             title_small:"Получите номер заказа"
         },
         {
            number:"4",
            title_big:"Оплата",
            title_small:"Оплатите Ваш заказ"
         }
     ]
   };
   this.draw_header = function(object_ref)
   {
       var header_div = document.createElement('div');
       header_div.className = 'cart_dialog_header_container row';

       for(var i in this.elements.elements)
       {
           var new_item = new object_ref.component_header_item(object_ref);
           new_item.number = this.elements.elements[i].number;
           new_item.title_big = this.elements.elements[i].title_big;
           new_item.title_small = this.elements.elements[i].title_small;
           var header_item = new_item.draw();
           header_item.setAttribute('data-id','screen_'+new_item.number);
           header_item.className = 'left cart_dialog_header_item';
           header_item.name = 'Cart_Header_Item';
           header_div.appendChild(header_item);
           //object_ref.header_objects_array.push(header_item);

           if(i < this.elements.elements.length-1)
           {
               var next = document.createElement('div');
               next.className = 'left';
               var ico = document.createElement('i');
               ico.className = "large material-icons";
               ico.innerText = "chevron_right";
               next.appendChild(ico);
               header_div.appendChild(next);
           }
       }
       return(header_div);
   };
 }
 this.component_header_item = function(object_ref)  
 {
     this.number = '';
     this.title_big = '';
     this.title_small = '';

     function onpress(e)
     {
         //console.log(e.target);
         var id = e.target;
         while (id.name != 'Cart_Header_Item')
         {
             id = id.parentNode;
             //console.log('going up ' + id.name);
         }
         //console.log(id.getAttribute('data-id'));

         for(var i in object_ref.header_objects_array)
         {
             object_ref.header_objects_array[i].className = 'left cart_dialog_header_item';
         }
         id.className = 'left cart_dialog_header_item_enabled';
         object_ref.header_objects_array = [];
         object_ref.header_objects_array.push(id);
         object_ref.change_screen(id.getAttribute('data-id'));
     }

     this.draw = function()
     {
         var header_item_div = document.createElement('div');
         var header_item_div_left = document.createElement('div');
         var header_item_div_right = document.createElement('div');
         var header_item_number = document.createElement('h4');
         var header_item_title_big = document.createElement('p');
         var header_item_title_small = document.createElement('p');

         header_item_title_big.innerText = this.title_big;
         header_item_title_small.innerText = this.title_small;
         header_item_number.innerText = this.number;

         header_item_div.className = 'row';
         header_item_div_left.className = 'left';
         header_item_div_right.className = 'right';

         header_item_div_left.appendChild(header_item_number);
         header_item_div_right.appendChild(header_item_title_big);
         header_item_div_right.appendChild(header_item_title_small);
         header_item_div.appendChild(header_item_div_left);
         header_item_div.appendChild(header_item_div_right);

         header_item_div.addEventListener('click',function(e){onpress(e);});
         return(header_item_div);
     }


 }

 // -
 
 
 //   Screens
this.component_screen_1 = function(object_ref)
{
  this.parent_object;
    //TO delete stub data for items_array_below
  var screen_data = {
      items_array:[
          {
              cart_item_id:"1212",
              label:"123",
              image_src:"http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
              selected_type:"100",
              selected_quantity:"2"
          },
          {
              cart_item_id:"1234",
              label:"12343",
              image_src:"http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
              selected_type:"200",
              selected_quantity:"1"
          },
          {
              cart_item_id:"123434",
              label:"12sdf3",
              image_src:"http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
              selected_type:"200",
              selected_quantity:"1"
          }
      ],
      footer_data:
      [
          {
              field:"total_sum",
              name:"общая сумма",
              value:"1200",
              suffix:" Rub"

          },
          {
              field:"shipping_sum",
              name:"доставка",
              value:"400",
              suffix:"Rub"

          }
      ]
  };
  screen_data.items_array = object_ref.cart_object.cart_items;

  this.init = function(object_ref)
  {
      var screen = document.createElement('div');
      var table_render = table_with_contents(screen_data.items_array);
      var footer_render = footer(screen_data.footer_data);
      var delimeter = document.createElement('div');
      delimeter.className = 'row';
      var hr = document.createElement('hr');
      delimeter.appendChild(hr);
      screen.appendChild(delimeter);
      screen.appendChild(table_render);
      screen.appendChild(delimeter);
      screen.appendChild(footer_render);


      return(screen);
  };
    
   function button_next_handler(screen_name)
   {
     //alert('trololo');
     //console.log(this.parent_object);
     //console.log(object_ref);
     object_ref.change_screen(screen_name);  
       
   }
  
   function table_with_contents (items_data)
    {
        //console.log(items_data);
        var table = document.createElement('table');
        table.className = 'cart_dialog screen_items_table highlight';
        var table_header = document.createElement('thead');
        var table_body = document.createElement('tbody');
        for(var i in items_data)
        {
          var row = document.createElement('tr');
          row.id = 'cart_item_rom_'+  items_data[i].cart_item_id;
          row.setAttribute('data-cartitemid',items_data[i].cart_item_id);
          row.className = 'cart_dialog_table_row';
          var img_td = document.createElement('td');
          var img = document.createElement('img');
          img.src = items_data[i].image_src;
          img.className = 'items_table_img';
          img_td.appendChild(img);

          var label_td = document.createElement('td');
          var label = document.createElement('p');
          label.innerText = items_data[i].label;
          label_td.appendChild(label);

          var type_td = document.createElement('td');
          var type = document.createElement('p');
          type.innerText = items_data[i].selected_type;
          type_td.appendChild(type);

          var quantity_td = document.createElement('td');
          var quantity = document.createElement('input');
          quantity.value = items_data[i].selected_quantity;
          quantity_td.appendChild(quantity);

          var delete_ico_td = document.createElement('td');
          var delete_ico = document.createElement('i');
          delete_ico.innerText = 'delete';
          delete_ico.className = 'material-icons';
          delete_ico.addEventListener('click',function(e){remove_from_cart_prompt(e)});
          delete_ico_td.appendChild(delete_ico);

         row.appendChild(img_td);
         row.appendChild(label_td);
         row.appendChild(type_td);
         row.appendChild(quantity_td);
         row.appendChild(delete_ico_td);

         table_body.appendChild(row);

        }
        table.appendChild(table_header);
        table.appendChild(table_body);
        //console.log(table);
        return(table);
    }

   function footer(footer_data)
   {
       var footer_div = document.createElement('div');
       footer_div.className = 'row';

       var summary_div = document.createElement('div');
       summary_div.className = 'col s4 m4 l4 4';

       for (var i in footer_data)
        {
          var new_field = document.createElement('p');
          new_field.id = footer_data[i].field;
          new_field.innerText =  footer_data[i].name + ': ' + footer_data[i].value +' ' + footer_data[i].suffix;
          new_field.className = 'left';
          summary_div.appendChild(new_field);

        }


       var next_button = document.createElement('button');
       next_button.innerText = 'продолжить';
       next_button.className = 'col s4 m4 l4 4';
       next_button.addEventListener('click',function(e){button_next_handler('screen_2');})
       
       var back_button = document.createElement('button');
       back_button.innerText = 'добавить что-нибудь еще';
       back_button.className = 'col s4 m4 l4 4';

       footer_div.appendChild(back_button);
       footer_div.appendChild(summary_div);
       footer_div.appendChild(next_button);

       return(footer_div);
   }

   this.footer_summary = function()
   {

   }

   function remove_from_cart_prompt(e)
   {
      //console.log(e.target.parentNode.parentNode);
       object_ref.cart_object.remove_from_cart(e.target.parentNode.parentNode.getAttribute('data-cartitemid'));
       e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
       // to-do add 1)  prompt to delete
   }


};
this.component_screen_2 = function()
 {
        screen_data = {
            items_array:[
                {
                    cart_item_id:"1212",
                    label:"123",
                    image_src:"http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type:"100",
                    selected_quantity:"2"
                },
                {
                    cart_item_id:"1234",
                    label:"12343",
                    image_src:"http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type:"200",
                    selected_quantity:"1"
                },
                {
                    cart_item_id:"123434",
                    label:"12sdf3",
                    image_src:"http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type:"200",
                    selected_quantity:"1"
                }
            ],
            footer_data:
                [
                    {
                        field:"total_sum",
                        name:"общая сумма",
                        value:"1200",
                        suffix:" Rub"

                    },
                    {
                        field:"shipping_sum",
                        name:"доставка",
                        value:"400",
                        suffix:"Rub"

                    }
                ],
            form_data:
            {
                field_groups:
                    [
                        {
                            name:"personal_info",
                            label:"Контактные данные",
                            className:"field_group_Contact",
                            fields:
                                [
                                    {
                                        description:"Имя",
                                        name:"Name",
                                        dom_type:"input",
                                        data_type:"text",
                                        className:"form_field_FirstName",
                                        required:"true"
                                    },
                                    {
                                        description:"Телефон",
                                        name:"Phone",
                                        dom_type:"input",
                                        data_type:"text",
                                        className:"form_field_Phone",
                                        required:"true"
                                    },
                                    {
                                        description:"Адрес электронной почты",
                                        name:"email",
                                        dom_type:"input",
                                        data_type:"email",
                                        className:"form_field_Email",
                                        required:"true"
                                    }
                                ]
                        },
                        {
                            name:"delivery",
                            label:"Доставка",
                            className:"field_group_Delivery",
                            fields:
                                [
                                    {
                                        description:"Метод доставки",
                                        name:"Delivery_Type",
                                        dom_type:"select",
                                        options:
                                            [
                                                {
                                                    name:"самовывоз из чайной",
                                                    value:"pickup",
                                                    attributes:["selected"]
                                                },
                                                {
                                                    name:"доставка",
                                                    value:"delivery"
                                                }
                                            ],
                                        className:"form_field_Delivery_Type",
                                        required:"true"
                                    },
                                    {
                                        description:"Город",
                                        name:"Name",
                                        dom_type:"input",
                                        data_type:"text",
                                        className:"form_field_FirstCity",
                                        required:"true"
                                    }
                                ]
                        },
                        {
                            name:"Test1",
                            label:"Тест группа",
                            className:"field_group_Delivery",
                            fields:
                                [
                                    {
                                        description:"Поле 1",
                                        name:"Delivery_Type123",
                                        dom_type:"select",
                                        options:
                                            [
                                                {
                                                    name:"123123123",
                                                    value:"pickup",
                                                    attributes:["selected"]
                                                },
                                                {
                                                    name:"123123123123",
                                                    value:"delivery"
                                                }
                                            ],
                                        className:"form_field_Delivery_Type",
                                        required:"true"
                                    },
                                    {
                                        description:"Поле 2",
                                        name:"Test2",
                                        dom_type:"input",
                                        data_type:"text",
                                        className:"form_field_FirstCity",
                                        required:"true"
                                    },
                                    {
                                        description:"Поле 2",
                                        name:"Test2",
                                        dom_type:"input",
                                        data_type:"date",
                                        className:"form_field_FirstCity",
                                        required:"true"
                                    }
                                ]
                        }
                    ],
                form_delivery:
                {
                    field_groups:
                     [
                         {
                             name:"delivery_address",
                             label:"Адрес доставки",
                             className:"field_group_delivery_adders",
                             fields:
                                 [
                                     {
                                         description:"Город",
                                         name:"City",
                                         dom_type:"input",
                                         data_type:"text",
                                         className:"form_field_FirstName",
                                         required:"true"
                                     }
                                 ]
                         }

                     ]  
                }

            }

        };
        this.init = function()
        {
            var screen = document.createElement('div');
            var body = screen_body();
            body.className = 'col s12 m12 l12 12';
            var footer_render = footer(screen_data.footer_data);
            var delimeter = document.createElement('div');
            delimeter.className = 'row';
            var hr = document.createElement('hr');
            delimeter.appendChild(hr);
            var br = document.createElement('br');
            screen.appendChild(delimeter);
            screen.appendChild(br);
            screen.appendChild(body);
            screen.appendChild(delimeter);
            screen.appendChild(footer_render);


            return(screen);
        };
        
        function screen_body()
        {
            var screen = document.createElement('div');
            var title = document.createElement('p');
            title.innerText = 'Доставка и Оплата';
            var form_render = form_builder();
            screen.appendChild(title);
            screen.appendChild(form_render);
            return(screen);
        }
        function footer(footer_data)
        {
            var footer_div = document.createElement('div');
            footer_div.className = 'row';

            var summary_div = document.createElement('div');
            summary_div.className = 'col s4 m4 l4 4';

            for (var i in footer_data)
            {
                var new_field = document.createElement('p');
                new_field.id = footer_data[i].field;
                new_field.innerText =  footer_data[i].name + ': ' + footer_data[i].value +' ' + footer_data[i].suffix;
                new_field.className = 'left';
                summary_div.appendChild(new_field);

            }


            var next_button = document.createElement('button');
            next_button.innerText = 'продолжить';
            next_button.className = 'col s4 m4 l4 4';

            var back_button = document.createElement('button');
            back_button.innerText = 'назад к заказу';
            back_button.className = 'col s4 m4 l4 4';
            back_button.addEventListener('click',function(e){});
            footer_div.appendChild(back_button);
            footer_div.appendChild(summary_div);
            footer_div.appendChild(next_button);

            return(footer_div);
        }

        function form_builder()
        {
          var form = document.createElement('form');
          form.id = 'delivery_and_pickup_form';
          for(var form_group in screen_data.form_data.field_groups)
          {

              var group_div = document.createElement('div');
              group_div.id = screen_data.form_data.field_groups[form_group].name;
              group_div.className = screen_data.form_data.field_groups[form_group].className;
              var group_title = document.createElement('h2');
              group_div.appendChild(group_title);
              group_title.innerText = screen_data.form_data.field_groups[form_group].label;
              for(var field in screen_data.form_data.field_groups[form_group].fields)
              {

                  var field_div = document.createElement('div');
                  field_div.id = 'field_group_'+ screen_data.form_data.field_groups[form_group].fields[field].name;

                  var field_description = document.createElement('p');
                  field_description.className = 'field_description';
                  field_description.innerHTML = screen_data.form_data.field_groups[form_group].fields[field].description;

                  var field_obj = document.createElement(screen_data.form_data.field_groups[form_group].fields[field].dom_type);

                  //console.log(screen_data.form_data.field_groups[form_group].fields);
                  //console.log(screen_data.form_data.field_groups[form_group].fields[field]);

                  field_obj .id =  screen_data.form_data.field_groups[form_group].fields[field].name;
                  if(screen_data.form_data.field_groups[form_group].fields[field].name != null)
                  {
                    field_obj.setAttribute('type',screen_data.form_data.field_groups[form_group].fields[field].data_type);
                  }
                  if(screen_data.form_data.field_groups[form_group].fields[field].dom_type == 'select')
                  {
                      for(var option in screen_data.form_data.field_groups[form_group].fields[field].options)
                      {
                          var option_obj = document.createElement('option');
                          option_obj.innerText = screen_data.form_data.field_groups[form_group].fields[field].options[option].name;
                          option_obj.value = screen_data.form_data.field_groups[form_group].fields[field].options[option].value;
                          for(var attribute in screen_data.form_data.field_groups[form_group].fields[field].options[option].attributes)
                          {
                              option_obj.setAttribute(screen_data.form_data.field_groups[form_group].fields[field].options[option].attributes[attribute],"");
                          }
                          field_obj .appendChild(option_obj);
                      }
                  }
                  if(screen_data.form_data.field_groups[form_group].fields[field].required == 'true')
                  {
                      field_obj .setAttribute('required','true');
                  }
                  field_div.appendChild(field_description);
                  field_div.appendChild(field_obj );
                  group_div.appendChild(field_div);

              }
              form.appendChild(group_div);
          }
          return(form);

        }

        this.footer_summary = function()
        {

        }



    };
this.component_screen_3 = function()
 {
        var screen_data = {
            items_array:[
                {
                    cart_item_id:"1212",
                    label:"123",
                    image_src:"http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type:"100",
                    selected_quantity:"2"
                },
                {
                    cart_item_id:"1234",
                    label:"12343",
                    image_src:"http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type:"200",
                    selected_quantity:"1"
                },
                {
                    cart_item_id:"123434",
                    label:"12sdf3",
                    image_src:"http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type:"200",
                    selected_quantity:"1"
                }
            ],
            footer_data:
                [
                    {
                        field:"total_sum",
                        name:"общая сумма",
                        value:"1200",
                        suffix:" Rub"

                    },
                    {
                        field:"shipping_sum",
                        name:"доставка",
                        value:"400",
                        suffix:"Rub"

                    }
                ]
        };
        this.init = function()
        {
            var screen = document.createElement('div');
            var body = screen_body();
            body.className = 'col s12 m12 l12 12';
            var footer_render = footer(screen_data.footer_data);
            var delimeter = document.createElement('div');
            delimeter.className = 'row';
            var hr = document.createElement('hr');
            delimeter.appendChild(hr);
            var br = document.createElement('br');
            screen.appendChild(delimeter);
            screen.appendChild(br);
            screen.appendChild(body);
            screen.appendChild(delimeter);
            screen.appendChild(footer_render);


            return(screen);
        };

        function screen_body()
        {
            var title = document.createElement('p');
            title.innerText = 'Сабмит заказаааа';
            return(title);
        }
        function footer(footer_data)
        {
            var footer_div = document.createElement('div');
            footer_div.className = 'row';

            var summary_div = document.createElement('div');
            summary_div.className = 'col s4 m4 l4 4';

            for (var i in footer_data)
            {
                var new_field = document.createElement('p');
                new_field.id = footer_data[i].field;
                new_field.innerText =  footer_data[i].name + ': ' + footer_data[i].value +' ' + footer_data[i].suffix;
                new_field.className = 'left';
                summary_div.appendChild(new_field);

            }


            var next_button = document.createElement('button');
            next_button.innerText = 'продолжить';
            next_button.className = 'col s4 m4 l4 4';

            var back_button = document.createElement('button');
            back_button.innerText = 'назад к заказу';
            back_button.className = 'col s4 m4 l4 4';
            back_button.addEventListener('click',function(e){});
            footer_div.appendChild(back_button);
            footer_div.appendChild(summary_div);
            footer_div.appendChild(next_button);

            return(footer_div);
        }

        this.footer_summary = function()
        {

        }



    };    
    
    
 //   Common Screens functions  
this.change_screen = function(screen)
    {

        //paint selected
        var header_items = document.getElementsByClassName('cart_dialog_header_item');
        var header_items1 = document.getElementsByClassName('cart_dialog_header_item_enabled');
        //header_items.concat(header_items1);

        for(var i in header_items1)
        {
            header_items1[i].className = 'left cart_dialog_header_item';
        }

        for(var i = 0; i <= header_items.length - 1;i++)
        {
            header_items[i].className = 'left cart_dialog_header_item';
            console.log(header_items[i].getAttribute('data-id')+' vs '+ screen);
            if(header_items[i].getAttribute('data-id') == screen)
            {
                console.log('wheeeee!!!!');
                header_items[i].className = 'left cart_dialog_header_item_enabled';
            }
        }
        var body_div = document.getElementById('cart_dialog_body_area');
        switch(screen)
        {
            case 'screen_2':
            {
                var screen_2_render = new this.component_screen_2(this);
                var screen_2_object = screen_2_render.init();
                
                body_div.innerHTML = '';
                body_div.appendChild(screen_2_object);
                $(document).ready(function() {
                    $('select').material_select();
                });
                break; 
            }
            case 'screen_1':
            {
                var screen_1_render = new this.component_screen_1(this);
                var screen_1_object = screen_1_render.init();
               
                body_div.innerHTML = '';
                body_div.appendChild(screen_1_object);
                break;
            }
            case 'screen_3':
            {
                var screen_3_render = new this.component_screen_3(this);
                var screen_3_object = screen_3_render.init();
               
                body_div.innerHTML = '';
                body_div.appendChild(screen_3_object);
                break;
            } 
        }
    }
}



/*
var cart_dialog_object = new cart_dialog_class(cart_dialog_object);
cart_dialog_object.target = 'place_for_cart_dialog';
cart_dialog_object.init(cart_dialog_object);
*/