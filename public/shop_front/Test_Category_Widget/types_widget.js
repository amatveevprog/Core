/**
 * Created by alexander.bondarik on 24.09.2016.
 */
// [=================== Categories Widget =======================]

var types_menu = function()
{
    this.target_div = '';
    //this.categories_object = {};

    this.init = function(types_menu_object,categories_object)
    {
      var types_div = document.createElement('div');
      for(var type in types_menu_object)
      {
         var button = document.createElement('button');
         button.innerText = types_menu_object[type].groups_label;
         button.id =  types_menu_object[type].groups_label;
         types_div.appendChild();
      }
      var target_object = document.getElementById(types_menu_object.target_div).appendChild(types_div);

    }
}

types_menu_object = new types_menu();
types_menu_object.target_div = 'types_area';
types_menu_object.init(types_menu_object,cart_widget.categories_data);
