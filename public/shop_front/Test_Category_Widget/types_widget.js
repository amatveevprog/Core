/**
 * Created by alexander.bondarik on 24.09.2016.
 */
// [=================== Categories Widget =======================]

var types_menu = function()
{
    this.target_div = '';
    //this.categories_object = {};

    this.init = function(types_menu_object,category_widget)
    {
      var types_div = document.createElement('div');
      for(var type in category_widget.categories_data.types)
      {
         var button = document.createElement('button');
         button.innerText =  category_widget.categories_data.types[type].groups_label;
         button.id =   category_widget.categories_data.types[type].groups_type;
          button.addEventListener("click",function(event)
          {
              event.stopPropagation();
              var selected_type = event.target.id;
              console.log(selected_type);
              cart_widget.selected_type = selected_type;
              cart_widget.init(category_widget);
          });
         types_div.appendChild(button);
      }
      var target_object = document.getElementById(types_menu_object.target_div).appendChild(types_div);

    }
}

types_menu_object = new types_menu();
types_menu_object.target_div = 'types_area';
types_menu_object.init(types_menu_object,cart_widget);
