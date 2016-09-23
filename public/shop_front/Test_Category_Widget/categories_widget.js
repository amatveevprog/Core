

// [=================== Categories Widget =======================]

function Category_widget(widget_object)
{
    this.categories_data = '';
    this.target_div = '';
    this.arrayOfUnchecked=[];


  //Initialization
     this.init = function(widget_object)
     {
         var widget_html = document.createElement('ul');
         widget_html.className = 'collapsible';
         widget_html.setAttribute('data-collapsible','expandable')
         widget_object.parse_groups(widget_object,widget_html);

     }

   //Parse_array_groups_Level
    this.parse_groups = function(widget_object,html_object)
    {
        for(var group in widget_object.categories_data.groups)
        {
            //create_group_object
            var html_group_object = document.createElement('li');

            //create_group_head
            var group_head = widget_object.create_group_head(widget_object,widget_object.categories_data.groups[group]);

            //creare_group_body
            var group_body = widget_object.create_group_body(widget_object,widget_object.categories_data.groups[group]);

            //create_group
            html_group_object.appendChild(group_head);
            html_group_object.appendChild(group_body);
            html_object.appendChild(html_group_object);
        }

       //add_to_target

        document.getElementById(widget_object.target_div).appendChild(html_object);

    }

    //Create_Category_Group_Head
    this.create_group_head = function(widget_object, group)
    {
       var group_head = document.createElement('div');
        group_head.className = 'collapsible-header';
       var group_icon = document.createElement('i');
        group_icon.className = 'material-icons small';
        group_icon.innerText = group.icon;
        var group_label = document.createElement('p');
        group_label.innerText = group.label;
      group_head.appendChild(group_icon);
      group_head.appendChild(group_label);
        return(group_head);
    }



    //Create_Category_Group_Body
    this.create_group_body = function(widget_object, group)
    {
        var group_body = document.createElement('div');
        group_body.className = 'collapsible-body';

        for(var category in group.categories)
        {
            var id_value = group.categories[category].id;
            var label_value = group.categories[category].label;
            var category = document.createElement('p');
            var input = document.createElement('input');
            input.type = 'checkbox';
            input.id = id_value;
            input.onChange = function(){console.log('changed!')};
            var this_ref = this;
            input.addEventListener("click",function(event){
                event.stopPropagation();
                if(event.target.checked==false)
                {
                    this_ref.arrayOfUnchecked.push(event.target.id);
                    console.log(this_ref.arrayOfUnchecked);
                }
                else
                {
                    var index = this_ref.arrayOfUnchecked.indexOf(event.target.id);
                    this_ref.arrayOfUnchecked.splice(index,1);
                    console.log(this_ref.arrayOfUnchecked);
                }

            });
            input.checked = 'checked';
            var label = document.createElement('label');
            label.setAttribute('for',id_value);
            label.id = 'label_'+id_value;
            label.innerText = label_value;

            category.appendChild(input);
            category.appendChild(label);
            group_body.appendChild(category);
        }

        console.log(group_body);
        return(group_body);

    }
    //Parse_Category_Group



}





//Test Init

var cart_widget = new Category_widget();
cart_widget.target_div = 'category_widget_div';

cart_widget.categories_data =

{
    "groups":[
        {
            "id":"tea_type",
            "label":"Тип чая",
            "icon":"invert_colors",
            "categories":[
                {
                    "id":"category_green",
                    "label":"Зеленые"
                },
                {
                    "id":"category_red",
                    "label":"Красные"
                },
                {
                    "id":"category_ulyn",
                    "label":"Улуны"
                },
                {
                    "id":"category_puerh",
                    "label":"Пуэры"
                }
            ]
        },
        {
            "id":"country",
            "label":"Страна",
            "icon":"account_balance",
            "categories":[
                {
                    "id":"category_china",
                    "label":"Китай"
                },
                {
                    "id":"category_india",
                    "label":"Индия"
                },
                {
                    "id":"category_japan",
                    "label":"Япония"
                },
                {
                    "id":"category_srilanka",
                    "label":"Япония"
                }
            ]

        }
    ]
};
cart_widget.init(cart_widget);
