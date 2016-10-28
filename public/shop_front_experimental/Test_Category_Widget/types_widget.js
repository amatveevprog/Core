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
        document.getElementById(types_menu_object.target_div).innerHTML = '';
        var types_div = document.createElement('div');
        for(var type in category_widget.categories_data.types)
        {
            var button = document.createElement('a');
            button.innerText =  category_widget.categories_data.types[type].group_label;
            button.id =   category_widget.categories_data.types[type].group_type;
            button.className = 'category_type_button';
            button.addEventListener("click",function(event)
            {
                event.stopPropagation();
                var selected_type = event.target.id;
                console.log(selected_type);
                category_widget.selected_type = selected_type;
                window.localStorage['category_widget_selected_type'] = JSON.stringify(category_widget.selected_type);
                category_widget.init(category_widget);

            });
            types_div.appendChild(button);
        }
        var target_object = document.getElementById(types_menu_object.target_div).appendChild(types_div);

    }
}
