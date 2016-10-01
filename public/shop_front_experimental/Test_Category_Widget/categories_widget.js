

// [=================== Categories Widget =======================]

function Category_widget(widget_object)
{
    this.categories_data = '';
    this.target_div = '';
    this.arrayOfUnchecked=[];
    this.selected_type = '';


  //Initialization
     this.init = function(widget_object)
     {
         console.log('initializing the Category_Widget');
         this.arrayOfUnchecked=[];
         document.getElementById(widget_object.target_div).innerHTML = '';
         var widget_html = document.createElement('ul');
         widget_html.className = 'collapsible';
         widget_html.setAttribute('data-collapsible','expandable');
         widget_object.parse_types(widget_object,widget_html,widget_object.selected_type);
         catalog_object.Update_Categories;
         var fasset_array = ['null'];
         catalog_object.search(fasset_array,this.selected_type);
         $('.collapsible').collapsible({
             accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
         });
     }

    //Parse_Types_Level 1
    this.parse_types = function(widget_object,html_object,selected_type)
    {
        for(var type in widget_object.categories_data.types)
        {
            console.log(widget_object.categories_data.types);
            if(widget_object.categories_data.types[type].group_type == selected_type)
            {
                widget_object.parse_groups(widget_object,html_object,widget_object.categories_data.types[type].groups);
            }
            else
            {
                console.log('error! no such type in categories data');
            }
        }
    }

   //Parse_array_groups_Level 2
    this.parse_groups = function(widget_object,html_object,type_data)
    {
        for(var group in type_data)
        {
            //create_group_object
            var html_group_object = document.createElement('li');
            html_group_object.className='active';
            //create_group_head
            var group_head = widget_object.create_group_head(widget_object,type_data[group]);

            //creare_group_body
            var group_body = widget_object.create_group_body(widget_object,type_data[group]);

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
        group_head.className = 'collapsible-header active';
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
            //input.onChange = function(){console.log('changed!')};
            var this_ref = this;
            input.checked = 'true';
            input.className = 'category_widget_check_box';
            input.addEventListener("click",function(event){
                event.stopPropagation();
                if(event.target.checked==false)
                {
                    this_ref.arrayOfUnchecked.push(event.target.id);
                    catalog_object.search(this_ref.arrayOfUnchecked,widget_object.selected_type);
                }
                else
                {
                    var index = this_ref.arrayOfUnchecked.indexOf(event.target.id);
                    this_ref.arrayOfUnchecked.splice(index,1);
                    catalog_object.search(this_ref.arrayOfUnchecked,widget_object.selected_type);
                }

            });

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
