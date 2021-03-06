/**
 * Created by alexander.bondarik on 14.10.2016.
 */

function cart_dialog_class(object_ref) {
    this.header_objects_array = [];
    this.target = '';
    this.cart_object;
    this.form_data;

    this.init = function (object_ref) {
        var dialog_layout = document.createElement('div');
        var header_div = document.createElement('div');
        header_div.id = 'cart_dialog_header_area';
        var header_render = new object_ref.component_header();
        var header_object = header_render.draw_header(object_ref);
        header_div.appendChild(header_object);
        var body_div = document.createElement('div');
        body_div.id = 'cart_dialog_body_area';

        //var screen_1_render = new object_ref.component_screen_1(object_ref);
        //screen_1_render.parent_object = object_ref;
        //var screen_1_object = screen_1_render.init(object_ref);
        //body_div.appendChild(screen_1_object);
        dialog_layout.appendChild(header_div);
        var hr_div = document.createElement('div');
        dialog_layout.appendChild(body_div);
        document.getElementById(object_ref.target).appendChild(dialog_layout);
        object_ref.change_screen('screen_1');

    };

    //refresh
// Header
    this.component_header = function () {
        this.elements = {
            elements: [
                {
                    number: "1",
                    title_big: "Корзина",
                    title_small: "Проверить корзину"
                },
                {
                    number: "2",
                    title_big: "Доставка и Метод оплаты",
                    title_small: "Введите тип доставки и Метод оплаты"
                },
                {
                    number: "3",
                    title_big: "Подтверждение заказа",
                    title_small: "Получите номер заказа"
                },
                {
                    number: "4",
                    title_big: "Оплата",
                    title_small: "Оплатите Ваш заказ"
                }
            ]
        };
        this.draw_header = function (object_ref) {
            var header_div = document.createElement('div');
            header_div.className = 'cart_dialog_header_container row';

            for (var i in this.elements.elements) {
                var new_item = new object_ref.component_header_item(object_ref);
                new_item.number = this.elements.elements[i].number;
                new_item.title_big = this.elements.elements[i].title_big;
                new_item.title_small = this.elements.elements[i].title_small;
                var header_item = new_item.draw();
                header_item.setAttribute('data-id', 'screen_' + new_item.number);
                header_item.className = 'left cart_dialog_header_item';
                header_item.name = 'Cart_Header_Item';
                header_div.appendChild(header_item);

                if (i < this.elements.elements.length - 1) {
                    var next = document.createElement('div');
                    next.className = 'left';
                    var ico = document.createElement('i');
                    ico.className = "large material-icons";
                    ico.innerText = "chevron_right";
                    next.appendChild(ico);
                    header_div.appendChild(next);
                }
            }
            return (header_div);
        };
    }
    this.component_header_item = function (object_ref) {
        this.number = '';
        this.title_big = '';
        this.title_small = '';

        function onpress(e)
        {
            var id = e.target;
            while (id.name != 'Cart_Header_Item')
            {
                id = id.parentNode;
            }

            var selected_arr = document.getElementsByClassName('left cart_dialog_header_item_enabled');
            for (var i in selected_arr)
            {
                //selected_arr[i].className = 'left cart_dialog_header_item';
            }
            //id.className = 'left cart_dialog_header_item_enabled';
            object_ref.header_objects_array = [];
            object_ref.header_objects_array.push(id);
            object_ref.change_screen(id.getAttribute('data-id'));
        }

        this.draw = function () {
            var header_item_div = document.createElement('div');
            var header_item_div_left = document.createElement('div');
            var header_item_div_right = document.createElement('div');
            /*var header_item_number = document.createElement('p');*/
            var header_item_title_big = document.createElement('h6');
            header_item_title_big.className = 'header_item_title_big';
            var header_item_title_small = document.createElement('p');
            header_item_title_small.className = 'header_item_title_small';

            header_item_title_big.innerText = this.title_big;
            header_item_title_small.innerText = this.title_small;
            /*header_item_number.innerText = this.number + '.';*/

            header_item_div.className = 'row';
/*
            header_item_div_left.className = 'left';
            header_item_div_right.className = 'right';
*/

           /* header_item_div_left.appendChild(header_item_number);*/
            header_item_div_right.appendChild(header_item_title_big);
            header_item_div_right.appendChild(header_item_title_small);
            header_item_div.appendChild(header_item_div_left);
            header_item_div.appendChild(header_item_div_right);

            header_item_div.addEventListener('click', function (e) {
                onpress(e);
            });
            return (header_item_div);
        }


    }

    // -


    //   Screens
    this.component_screen_1 = function (object_ref) {
        this.parent_object;
        //TO delete stub data for items_array_below
        var screen_data = {
            items_array: [
                {
                    cart_item_id: "1212",
                    label: "123",
                    image_src: "http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type: "100",
                    selected_quantity: "2"
                },
                {
                    cart_item_id: "1234",
                    label: "12343",
                    image_src: "http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type: "200",
                    selected_quantity: "1"
                },
                {
                    cart_item_id: "123434",
                    label: "12sdf3",
                    image_src: "http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type: "200",
                    selected_quantity: "1"
                }
            ],
            footer_data: [
                {
                    field: "total_sum",
                    name: "Общая сумма (*без учета стоиомости доставки)",
                    value: "1200",
                    suffix: " Rub"

                }
            ]
        };
        screen_data.items_array = object_ref.cart_object.cart_items;
        screen_data.footer_data[0].value = 0 + object_ref.cart_object.cart_sum;
        this.init = function (object_ref)
        {

            var screen = document.createElement('div');
            var screen_title = document.createElement('p');
            screen_title.innerText = 'Ваш заказ:'
            screen_title.className = 'cart_dialog_items_title';
            var table_render = table_with_contents(screen_data.items_array);
            var footer_render = footer(screen_data.footer_data);
            var delimeter = document.createElement('div');
            delimeter.className = 'row';
            screen.appendChild(delimeter);
            screen.appendChild(screen_title);
            screen.appendChild(table_render);
            screen.appendChild(delimeter);
            screen.appendChild(footer_render);


            return (screen);
        };


        function button_next_handler(screen_name) {
            //alert('trololo');
            //console.log(this.parent_object);
            //console.log(object_ref);
            object_ref.change_screen(screen_name);

        }

        function table_with_contents(items_data) {
            //console.log(items_data);
            var table = document.createElement('table');
            table.className = 'cart_dialog screen_items_table highlight';
            var table_header = document.createElement('thead');
            var table_body = document.createElement('tbody');
            for (var i in items_data) {
                var row = document.createElement('tr');
                row.id = 'cart_item_rom_' + items_data[i].cart_item_id;
                row.setAttribute('data-cartitemid', items_data[i].cart_item_id);
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
                delete_ico.addEventListener('click', function (e) {
                    remove_from_cart_prompt(e);
                });
                delete_ico_td.appendChild(delete_ico);

                var position_price_td = document.createElement('td');
                var position_price = document.createElement('p');
                position_price.innerText = items_data[i].position_price +' Rub';
                position_price_td.appendChild(position_price);

                row.appendChild(img_td);
                row.appendChild(label_td);
                row.appendChild(type_td);
                row.appendChild(quantity_td);
                row.appendChild(delete_ico_td);
                row.appendChild(position_price_td);

                table_body.appendChild(row);

            }
            table.appendChild(table_header);
            table.appendChild(table_body);
            //console.log(table);
            return (table);
        }

        function footer(footer_data) {
            var footer_div = document.createElement('div');
            footer_div.className = 'row cart_dialog_footer_div';

            var summary_div = document.createElement('div');
            summary_div.className = 'col s12 m8 l8 8';

            for (var i in footer_data) {
                var new_field = document.createElement('p');
                new_field.id = footer_data[i].field;
                new_field.innerHTML = footer_data[i].name + ': ' + footer_data[i].value + '  ' + footer_data[i].suffix+ '<br/>';
                // new_field.className = 'left';
                summary_div.appendChild(new_field);

            }


            var next_button = document.createElement('button');
            next_button.innerText = 'продолжить';
            next_button.className = 'col s6 m2 l2 2 cart_dialog_button';
            next_button.addEventListener('click', function (e) {

                button_next_handler('screen_2');
            })

            var back_button = document.createElement('button');
            back_button.innerText = 'добавить что-нибудь еще';
            back_button.className = 'col s6 m2 l2 2 cart_dialog_button';

            footer_div.appendChild(summary_div);
            footer_div.appendChild(back_button);
            footer_div.appendChild(next_button);

            return (footer_div);
        }

        this.footer_summary = function () {

        }

        function remove_from_cart_prompt(e) {
            //console.log(e.target.parentNode.parentNode);
            object_ref.cart_object.remove_from_cart(e.target.parentNode.parentNode.getAttribute('data-cartitemid'));
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
            // to-do add 1)  prompt to delete
            repaint_sum(object_ref);
        }

        //repaint cart summary
        function repaint_sum(object_ref)
        {
            var sum_block = document.getElementById('total_sum');
            sum_block.innerHTML = 'Общая сумма: ' + object_ref.cart_object.cart_sum + ' Rub';
        }


       /* function check_items()
        {
            if( screen_data.footer_data[0].value == 0)
            {
                return(false);
            }
            else
            {
                return(true);
            }
        }*/


    };
    this.component_screen_2 = function (object_ref) {
        screen_data = {
            items_array: [
                {
                    cart_item_id: "1212",
                    label: "123",
                    image_src: "http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type: "100",
                    selected_quantity: "2"
                },
                {
                    cart_item_id: "1234",
                    label: "12343",
                    image_src: "http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type: "200",
                    selected_quantity: "1"
                },
                {
                    cart_item_id: "123434",
                    label: "12sdf3",
                    image_src: "http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type: "200",
                    selected_quantity: "1"
                }
            ],
            footer_data: [
                {
                    field: "total_sum",
                    name: "Общая сумма (*без учета стоиомости доставки)",
                    value: "1200",
                    suffix: " Rub"

                }
            ],
            form_data: {
                field_groups: [
                    {
                        name: "personal_info",
                        label: "Контактные данные",
                        className: "field_group_Contact",
                        fields: [
                            {
                                description: "Имя",
                                name: "Name",
                                dom_type: "input",
                                data_type: "text",
                                className: "form_field_ShortName",
                                required: "true",
                                placeholder:"Имя",
                                icon:"account_circle"
                            },
                            {
                                description: "Телефон",
                                name: "Phone",
                                dom_type: "input",
                                data_type: "text",
                                className: "form_field_Phone",
                                required: "true",
                                placeholder:"Телефон",
                                icon:"phone"
                            },
                            {
                                description: "email",
                                name: "email",
                                dom_type: "input",
                                data_type: "email",
                                className: "form_field_Email",
                                required: "true",
                                icon:"email",
                                placeholder:"email"
                            },
                            {
                                description: "вероисповедание",
                                name: "religion",
                                dom_type: "input",
                                data_type: "text",
                                className: "form_field_religion",
                                required: "true",
                                icon:"wb_sunny",
                                placeholder:"email"
                            },

                        ]
                    },
                    {
                        name: "delivery",
                        label: "Доставка",
                        className: "field_group_Delivery",
                        fields: [
                            {
                                description: "Метод Доставки",
                                name: "Delivery_Type",
                                dom_type: "select",
                                options: [
                                    {
                                        name: "самовывоз из чайной (Москва)",
                                        value: "pickup_from_point",
                                        attributes: ["selected"],
                                        message:'САМАВЫВАЗ ИЗ ЧАЙНОЙ, <br/> <h5> ХАЛЯВА</h5><br/> Выберите место, откуда будет удобно забрать чай:',
                                        options:
                                            [
                                                {
                                                    description:"чайная на красной площади",
                                                    name:"red_square"
                                                },
                                                {
                                                    description:"чайная в горах Хуань",
                                                    name:"huan_mountains"
                                                }
                                            ]

                                    },
                                    {
                                        name: "доставка курьером (Москва)",
                                        value: "delivery",
                                        message:'ДАСТАВКА КУРЬЕРОМ, <br/> <h1> КУРИЕР </h1>'

                                    },
                                    {
                                        name: "Доставка почтой России в регионы",
                                        value: "delivery_post",
                                        message:'ПОЧТА РАССИИ  <br/> * Долго, Дешего, Не туда'

                                    }
                                ],
                                className: "form_field_Delivery_Type",
                                required: "true"
                            }
                           /* {
                                description: "Возможные варианты доставки",
                                name: "Delivery_Type",
                                dom_type: "select",
                                options: [
                                    {
                                        name: "самовывоз из чайной",
                                        value: "pickup",
                                        attributes: ["selected"]
                                    },
                                    {
                                        name: "доставка курьером",
                                        value: "delivery"

                                    }
                                ],
                                className: "form_field_Delivery_Type",
                                required: "true",
                               /!* action: {
                                    type: "append_section",
                                    variants: [
                                        {
                                            case: "pickup",
                                            subform: "delivery_pickup"
                                        },
                                        {
                                            case: "delivery",
                                            subform: "delivery_delivery"
                                        }
                                    ]

                                }*!/
                            },*/
                        ]
                    },
                    {
                        name: "Payment",
                        label: "Метод оплаты",
                        className: "field_group_Payment",
                        fields: [
                            {
                                description: "Метод Оплаты",
                                name: "Payment_Type",
                                dom_type: "select",
                                options: [
                                    {
                                        name: "Оплата наличными курьеру",
                                        value: "cash_logistics",
                                        attributes: ["selected"]
                                    },
                                    {
                                        name: "Оплата картой курьеру",
                                        value: "credit_logistics"

                                    },
                                    {
                                        name: "Предоплата картой на сайте",
                                        value: "credit_website"

                                    }
                                ],
                                className: "form_field_Payment_Type",
                                required: "true"
                            },
                                ]
                    },
                    /*{
                        name: "Test1",
                        label: "Тест группа",
                        className: "field_group_Delivery",
                        fields: [
                            {
                                description: "Поле 1",
                                name: "Delivery_Type123",
                                dom_type: "select",
                                options: [
                                    {
                                        name: "123123123",
                                        value: "pickup",
                                        attributes: ["selected"]
                                    },
                                    {
                                        name: "123123123123",
                                        value: "delivery"
                                    }
                                ],
                                className: "form_field_Delivery_Type",
                                required: "true"
                            },
                            {
                                description: "Поле 2",
                                name: "Test2",
                                dom_type: "input",
                                data_type: "text",
                                className: "form_field_FirstCity",
                                required: "true"
                            },
                            {
                                description: "Поле 2",
                                name: "Test2",
                                dom_type: "input",
                                data_type: "date",
                                className: "form_field_FirstCity",
                                required: "true"
                            }
                        ]
                    }*/
                ],
                sub_forms: [
                    {
                        name: "delivery_delivery",
                        field_groups: [
                            {
                                name: "delivery_delivery_address",
                                className: "field_group_delivery_adders",
                                label: "Доставка",
                                fields: [
                                    {
                                        description: "Город",
                                        name: "City",
                                        dom_type: "input",
                                        data_type: "text",
                                        className: "form_field_FirstName",
                                        required: "true"
                                    },
                                    {
                                        description: "Улица",
                                        name: "elivery_delivery_address_Street",
                                        dom_type: "input",
                                        data_type: "text",
                                        className: "form_field_FirstName",
                                        required: "true"
                                    },
                                    {
                                        description: "Фанарь",
                                        name: "elivery_delivery_address_Phonarr",
                                        dom_type: "input",
                                        data_type: "text",
                                        className: "form_field_FirstName",
                                        required: "true"
                                    }
                                ]
                            }

                        ]
                    },
                    {
                        name: "delivery_pickup",
                        field_groups: [
                            {
                                name: "delivery_pickup_address",
                                className: "field_group_delivery_pickup_adderes",
                                label: "Самовывоз",
                                fields: [
                                    {
                                        description: "Город",
                                        name: "field_group_delivery_pickup_adderes_City",
                                        dom_type: "input",
                                        data_type: "text",
                                        className: "form_field_FirstName",
                                        required: "true"
                                    }
                                ]
                            }

                        ]
                    }

                ]
            }

        };
        screen_data.items_array = object_ref.cart_object.cart_items;
        screen_data.footer_data[0].value = 0 + object_ref.cart_object.cart_sum;
        this.init = function () {
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
            return (screen);
        };

        function screen_body() {
            var screen = document.createElement('div');
            var form_render = form_builder();
            screen.appendChild(form_render);
            var button = document.createElement('button');
            // button.innerText = 'Test!';
            // button.onclick = function()
            // {
            //     get_data_from_form()
            // };
            // //screen.appendChild(button);
            return (screen);
        }

        function footer(footer_data) {
            var footer_div = document.createElement('div');
            footer_div.className = 'row cart_dialog_footer_div';

            var summary_div = document.createElement('div');
            summary_div.className = 'col s4 m4 l4 4';

            for (var i in footer_data)
            {
                var new_field = document.createElement('p');
                new_field.id = footer_data[i].field;
                new_field.innerHTML = footer_data[i].name + ': ' + footer_data[i].value + ' ' + footer_data[i].suffix +'';
                new_field.className = 'left';
                var new_line = document.createElement('br');
                summary_div.appendChild(new_field);

            }


            var next_button = document.createElement('button');
            next_button.innerText = 'продолжить';
            next_button.className = 'col s4 m4 l4 4 cart_dialog_button';

            var back_button = document.createElement('button');
            back_button.innerText = 'назад к заказу';
            back_button.className = 'col s4 m4 l4 4 cart_dialog_button';
            back_button.addEventListener('click', function (e) {
            });


            footer_div.appendChild(summary_div);
            footer_div.appendChild(back_button);
            footer_div.appendChild(next_button);


            return (footer_div);
        }

        function form_builder()
        {
            try
            {
                var saved_data = JSON.parse(window.localStorage.getItem('cart_form_data'));
            }
            catch(e)
            {
            }

            var form = document.createElement('form');
            form.id = 'delivery_and_pickup_form';
            form.className = 'container cart_information_form';
            for (var form_group in screen_data.form_data.field_groups)
            {
                var group_div_main = document.createElement('div');
                var group_div = document.createElement('div');
                group_div.id = screen_data.form_data.field_groups[form_group].name;
                group_div.className = screen_data.form_data.field_groups[form_group].className;
                group_div.className += ' cart_information_form_section';
                var group_title = document.createElement('h4');
                group_div_main.appendChild(group_title);
                group_div_main.appendChild(group_div);
                group_title.innerText = screen_data.form_data.field_groups[form_group].label;
                group_title.className = "Grey-text thin cart_dialog_personal_data_title";
                group_title.style = "text-align:center;";
                for (var field in screen_data.form_data.field_groups[form_group].fields) {

                    var field_div = document.createElement('div');
                    field_div.id = 'field_group_' + screen_data.form_data.field_groups[form_group].fields[field].name;
                    field_div.className = 'input-field';

                    var field_obj = document.createElement(screen_data.form_data.field_groups[form_group].fields[field].dom_type);
                    field_obj.id = screen_data.form_data.field_groups[form_group].fields[field].name;
                    if((screen_data.form_data.field_groups[form_group].fields[field].dom_type == 'input')&&(screen_data.form_data.field_groups[form_group].fields[field].data_type != 'date'))
                    {
                        var field_description = document.createElement('label');
                        field_obj.style = 'border-color:#effff0';
                    }
                    else
                    {
                        var field_description = document.createElement('p');
                    }

                    if (screen_data.form_data.field_groups[form_group].fields[field].data_type == 'checkbox') {
                        field_description = document.createElement('label');
                        var for_value = screen_data.form_data.field_groups[form_group].fields[field].name;
                        field_description.setAttribute('for', for_value);
                    }

                    field_description.className = 'field_description';
                    field_description.for = screen_data.form_data.field_groups[form_group].fields[field].name;
                    field_description.innerHTML = screen_data.form_data.field_groups[form_group].fields[field].description;


                    if(screen_data.form_data.field_groups[form_group].fields[field].icon != null)
                    {
                        var field_icon = document.createElement('i');
                        field_icon.className = 'material-icons prefix';
                        field_icon.id = screen_data.form_data.field_groups[form_group].fields[field].name;
                        field_icon.innerText = screen_data.form_data.field_groups[form_group].fields[field].icon;
                    }
                   // field_obj.placeholder =screen_data.form_data.field_groups[form_group].fields[field].placeholder;
                    //Add Action
                    if (screen_data.form_data.field_groups[form_group].fields[field].action != null) {
                        var action = screen_data.form_data.field_groups[form_group].fields[field].action;
                        field_obj.onchange = function (e) {
                            form_function(screen_data.form_data.field_groups[form_group], action, e.target);
                        };

                        /** field_obj.setAttribute('change',function(){
                          console.log('ewwerwe12');
                          console.log(screen_data.form_data.field_groups[form_group].fields[field].action);
                          form_function(screen_data.form_data.field_groups[form_group].fields[field].action);
                      });
                         **/
                    }
                    else {
                        //Then just set save to Storage
                        field_obj.onchange = function (e) {get_data_from_form(e)};
                        field_obj.id = 'select_'+screen_data.form_data.field_groups[form_group].fields[field].name;
                    }

                    if (screen_data.form_data.field_groups[form_group].fields[field].name != null) {
                        field_obj.setAttribute('type', screen_data.form_data.field_groups[form_group].fields[field].data_type);
                    }

                    if (screen_data.form_data.field_groups[form_group].fields[field].dom_type == 'select')
                    {
                        for (var option in screen_data.form_data.field_groups[form_group].fields[field].options)
                        {
                            var option_obj = document.createElement('option');
                            option_obj.innerText = screen_data.form_data.field_groups[form_group].fields[field].options[option].name;
                            option_obj.value = screen_data.form_data.field_groups[form_group].fields[field].options[option].value;
                            for (var attribute in screen_data.form_data.field_groups[form_group].fields[field].options[option].attributes) {
                                option_obj.setAttribute(screen_data.form_data.field_groups[form_group].fields[field].options[option].attributes[attribute], "");
                            }
                            field_description.className += 'field_description_select grey-text';

                            field_obj.appendChild(option_obj);
                        }
                    }


                    if (screen_data.form_data.field_groups[form_group].fields[field].required == 'true') {
                        field_obj.setAttribute('required', 'true');
                    }



                    //Check if already filled
                    //console.log(saved_data);
                    for(var k in saved_data)
                    {

                        for(var t in saved_data[k])
                        {
                            if(t == screen_data.form_data.field_groups[form_group].fields[field].name)
                            {
                                if(screen_data.form_data.field_groups[form_group].fields[field].dom_type != 'select')
                                {
                                    field_obj.value =  saved_data[k][t];
                                }
                                if(screen_data.form_data.field_groups[form_group].fields[field].dom_type == 'select')
                                {
                                    field_obj.value = '';
                                }

                            }
                        }
                    }

                    if(screen_data.form_data.field_groups[form_group].fields[field].icon != null)
                    {
                        field_div.appendChild(field_icon);
                    }

                    field_div.appendChild(field_description);
                    field_div.appendChild(field_obj);
                    group_div.appendChild(field_div);

                    if (screen_data.form_data.field_groups[form_group].fields[field].data_type == 'checkbox')
                    {
                        field_div.innerHTML = '';
                        field_div.appendChild(field_obj);
                        field_div.appendChild(field_description);
                    }

                }
                form.appendChild(group_div_main);
            }
            return (form);

        }

        function build_section(subform) {
            try {
                var saved_data = JSON.parse(window.localStorage.getItem('cart_form_data'));
            }
            catch(e)
            {
            }
            var form = document.createElement('div');
            form.id = 'sub_from_' + subform.name;
            for (var form_group in subform.field_groups)
            {
                var group_div_main = document.createElement('div');
                var group_div = document.createElement('div');
                group_div.id = subform.field_groups[form_group].name;
                group_div.className = subform.field_groups[form_group].className;
                group_div.className += '  cart_information_form_section';
                var group_title = document.createElement('h4');
                group_div.appendChild(group_title);
                group_title.innerText = subform.field_groups[form_group].label;
                group_title.className = 'Grey-text thin cart_dialog_personal_data_title';
                group_div_main.appendChild(group_title);
                group_div_main.appendChild(group_div);

                for (var field in subform.field_groups[form_group].fields) {

                    var field_div = document.createElement('div');
                    field_div.id = 'field_group_' + subform.field_groups[form_group].fields[field].name;
                    var field_description = document.createElement('p');
                    if (subform.field_groups[form_group].fields[field].data_type == 'checkbox') {
                        field_description = document.createElement('label');
                        var for_value = screen_data.form_data.field_groups[form_group].fields[field].name;
                        field_description.setAttribute('for', for_value);
                    }

                    field_description.className = 'field_description';
                    field_description.innerHTML = subform.field_groups[form_group].fields[field].description;

                    var field_obj = document.createElement(subform.field_groups[form_group].fields[field].dom_type);

                    field_obj.id = subform.field_groups[form_group].fields[field].name;

                    //Add Action
                    if (subform.field_groups[form_group].fields[field].action != null) {
                        var action = subform.field_groups[form_group].fields[field].action;
                        field_obj.onchange = function (e) {
                            form_function(subform.field_groups[form_group].fields[field], action, e.target);
                        };

                        /** field_obj.setAttribute('change',function(){
                          console.log('ewwerwe12');
                          console.log(screen_data.form_data.field_groups[form_group].fields[field].action);
                          form_function(screen_data.form_data.field_groups[form_group].fields[field].action);
                      });
                         **/
                    }

                    if (subform.field_groups[form_group].fields[field].name != null) {
                        field_obj.setAttribute('type', subform.field_groups[form_group].fields[field].data_type);
                    }

                    if (subform.field_groups[form_group].fields[field].dom_type == 'select') {
                        for (var option in subform.field_groups[form_group].fields[field].options) {
                            var option_obj = document.createElement('option');
                            option_obj.innerText = subform.field_groups[form_group].fields[field].options[option].name;
                            option_obj.value = subform.field_groups[form_group].fields[field].options[option].value;
                            for (var attribute in subform.field_groups[form_group].fields[field].options[option].attributes) {
                                option_obj.setAttribute(subform.field_groups[form_group].fields[field].options[option].attributes[attribute], "");
                            }
                            field_obj.appendChild(option_obj);
                        }
                    }

                    if (subform.field_groups[form_group].fields[field].required == 'true') {
                        field_obj.setAttribute('required', 'true');
                    }

                    //Check if already filled
                    //console.log(saved_data);
                    for(var k in saved_data)
                    {

                        for(var t in saved_data[k])
                        {

                            if(t == screen_data.form_data.field_groups[form_group].fields[field].name)
                            {
                                field_obj.value =  saved_data[k][t];
                            }
                        }
                    }
                     // console.log(field_obj.value);
                    field_div.appendChild(field_description);
                    field_div.appendChild(field_obj);
                    group_div.appendChild(field_div);
                    console.log(group_div);
                    if (subform.field_groups[form_group].fields[field].data_type == 'checkbox') {
                        field_div.innerHTML = '';
                        field_div.appendChild(field_obj);
                        field_div.appendChild(field_description);
                    }

                }
                console.log(form);
                form.appendChild(group_div_main);
            }
            return (form);
        }

        function form_function(field_section, action, target) {
            switch (action.type) {
                case "append_section": {
                    for (var i in action.variants) {
                        if (target.value == action.variants[i].case) {
                            var formname = action.variants[i].subform;
                            for (var j in screen_data.form_data.sub_forms) {
                                if (screen_data.form_data.sub_forms[j].name == formname) {
                                    var subform = screen_data.form_data.sub_forms[j];
                                    var section = build_section(subform);
                                   // console.log(section);
                                    try {
                                        var adding_section = document.getElementById('sub_form_' + screen_data.form_data.sub_forms[j].name);
                                        document.getElementById("subform_"+field_section.name).parentNode.replaceChild(section, document.getElementById("subform_"+field_section.name));
                                        //document.getElementById("subform_"+field_section.name).parentNode.replaceChild(section,document.getElementById("subform_"+field_section.name));
                                    }
                                    catch (e) {
                                        /**
                                        var new_section = document.createElement("div");
                                        new_section.id = "subform_"+field_section.name;
                                        new_section.innerHTML = section.innerHTML;
                                        console.log(document.getElementById(field_section.name));
                                        document.getElementById(field_section.name).parentNode.insertBefore(new_section, document.getElementById(field_section.name));
                                    **/
                                        section.id = "subform_"+field_section.name;
                                        document.getElementById(field_section.name).parentNode.insertBefore(section, document.getElementById(field_section.name));
                                    }
                                    //console.log(section);
                                }
                            }

                        }
                    }
                    break;
                }
            }
        }

        //get all the data from form

        function get_data_from_form(e)
        {
            console.log(e);
            // 1) prepare the structure
            //var form_fields = document.forms["delivery_and_pickup_form"].getElementsByTagName("input");
            var form_data = {};

            for(var key in screen_data.form_data.field_groups)
            {
                form_data[screen_data.form_data.field_groups[key].name] = {};
              for(var key2 in screen_data.form_data.field_groups[key].fields)
              {
                  try
                  {
                   form_data[screen_data.form_data.field_groups[key].name][screen_data.form_data.field_groups[key].fields[key2].name] = document.getElementById(screen_data.form_data.field_groups[key].fields[key2].name).value;
                  }
                  catch(e)
                  {
                      console.log(e.toString());
                  }

              }

            }

            for(var key0 in screen_data.form_data.sub_forms)
            {
                for(var key in screen_data.form_data.sub_forms[key0].field_groups) {
                    form_data[screen_data.form_data.sub_forms[key0].field_groups[key].name] = {};
                    for (var key2 in screen_data.form_data.sub_forms[key0].field_groups[key].fields) {
                        try {
                            form_data[screen_data.form_data.sub_forms[key0].field_groups[key].name][screen_data.form_data.sub_forms[key0].field_groups[key].fields[key2].name] = document.getElementById(screen_data.form_data.sub_forms[key0].field_groups[key].fields[key2].name).value;
                        }
                        catch (e) {
                            //console.log(e.toString());
                        }

                    }
                }

            }
            object_ref.form_data = form_data;
            window.localStorage.setItem('cart_form_data',JSON.stringify(form_data));
            //console.log(form_data);
        }

        this.footer_summary = function () {

        }

        this.add_logic_to_form = function()
        {
            delivery_type_logic();

        }

        //Custom Logic
          // Delivery Form
        function delivery_type_logic()
         {
             // draw delivery description
             function draw_new_div(option)
             {
                 main_block = document.getElementsByClassName('field_group_Delivery');

                 try
                 {
                     console.log('found block');
                     new_div = document.getElementById('delivery_option_details');
                     console.log(new_div);
                     new_div.innerHTML = '';
                 }
                 catch(e)
                 {
                     var new_div = document.createElement('div');
                     new_div.id = 'delivery_option_details';
                     new_div.className = 'delivery_option_details_div';
                 }

                 for(var i in screen_data.form_data.field_groups[1].fields[0].options)
                 {
                      if(screen_data.form_data.field_groups[1].fields[0].options[i].value == option)
                      {
                          new_div.innerHTML = screen_data.form_data.field_groups[1].fields[0].options[i].message;
                      }
                 }



                 //add input fields
                 switch(option)
                 {
                     case 'pickup_from_point':
                     {

                      //console.log('rendering...');
                      var fields_options = pickup_options();
                      new_div.appendChild(fields_options);
                      $('#delivery_options_address_select').material_select();
                      break;
                     }

                 }
                 main_block[0].appendChild(new_div);

             }

             // generate options for pickup
             function pickup_options()
             {
               var div_block = document.createElement('div');
               div_block.className = 'right-align select_pickup_point_address_div';
               var address_select = document.createElement('select');
               address_select.id = 'delivery_options_address_select';
               console.log('Options = ');
               console.log(screen_data.form_data.field_groups[1].fields[0].options[0].options);
               for(var i in screen_data.form_data.field_groups[1].fields[0].options[0].options)
               {
                   var option = document.createElement('option');
                   option.value = screen_data.form_data.field_groups[1].fields[0].options[0].options[i].name;
                   option.innerText = screen_data.form_data.field_groups[1].fields[0].options[0].options[i].description;
                   address_select.appendChild(option);
               }

               div_block.appendChild(address_select);
               //console.log(div_block);
               return(div_block);
             }

             // generate address field for delivery
             function delivery()
             {

             }
               console.log('Well, Adding event listener to select');
               elements = document.getElementById('field_group_Delivery_Type').childNodes[1].childNodes[2];
               console.log(elements);
               for(var i = 0; i <= elements.childNodes.length-1; i++)
               {
                   console.log(elements.childNodes[i]+'  ' +i);
                   document.getElementById('field_group_Delivery_Type').childNodes[1].childNodes[2].childNodes[i].addEventListener('click',function()
                   {
                       draw_new_div(document.getElementById('select_Delivery_Type').value);
                   });
               }

        //     document.getElementById('field_group_Delivery_Type').childNodes[1].onChange = function(){console.log('qwerty')};
        //     document.getElementById('field_group_Delivery_Type').childNodes[1].childNodes[3].addEventListener('change',function(e)
        //     {
        //         console.log(e);
        //         console.log('Keksik the best!!!');
        //     },false);
        }

    };
    this.component_screen_3 = function (object_ref) {
        var screen_data = {
            items_array: [
                {
                    cart_item_id: "1212",
                    label: "123",
                    image_src: "http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type: "100",
                    selected_quantity: "2"
                },
                {
                    cart_item_id: "1234",
                    label: "12343",
                    image_src: "http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type: "200",
                    selected_quantity: "1"
                },
                {
                    cart_item_id: "123434",
                    label: "12sdf3",
                    image_src: "http://c.dryicons.com/images/icon_sets/polygon_icons/png/128x128/write.png",
                    selected_type: "200",
                    selected_quantity: "1"
                }
            ],
            footer_data: [
                {
                    field: "total_sum",
                    name: "Общая сумма (*без учета стоиомости доставки)",
                    value: "1200",
                    suffix: " Rub"

                }
            ]
        };
        screen_data.items_array = object_ref.cart_object.cart_items;
        screen_data.footer_data[0].value = 0 + object_ref.cart_object.cart_sum;
        this.init = function () {
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


            return (screen);
        };

        function screen_body() {
            var title = document.createElement('p');
            title.innerText = 'Сабмит заказаааа';
            return (title);
        }

        function footer(footer_data) {
            var footer_div = document.createElement('div');
            footer_div.className = 'row cart_dialog_footer_div';

            var summary_div = document.createElement('div');
            summary_div.className = 'col s4 m4 l4 4';

            for (var i in footer_data) {
                var new_field = document.createElement('p');
                new_field.id = footer_data[i].field;
                new_field.innerHTML = footer_data[i].name + ': ' + footer_data[i].value + ' ' + footer_data[i].suffix+'<br/>';
                // new_field.className = 'left';
                summary_div.appendChild(new_field);

            }


            var next_button = document.createElement('button');
            next_button.innerText = 'продолжить';
            next_button.className = 'col s4 m4 l4 4 cart_dialog_button';

            var back_button = document.createElement('button');
            back_button.innerText = 'назад к заказу';
            back_button.className = 'col s4 m4 l4 4 cart_dialog_button';
            back_button.addEventListener('click', function (e) {
            });

            footer_div.appendChild(summary_div);
            footer_div.appendChild(back_button);
            footer_div.appendChild(next_button);


            return (footer_div);
        }

        this.footer_summary = function () {

        }


    };


    //   Common Screens functions
    this.change_screen = function (screen) {

        //paint selected
        var header_items = document.getElementsByClassName('cart_dialog_header_item');
        var header_items1 = document.getElementsByClassName('cart_dialog_header_item_enabled');
        //header_items.concat(header_items1);


        var body_div = document.getElementById('cart_dialog_body_area');
        switch (screen) {
            case 'screen_2': {
                var check = check_business_rules('screen_1',this);
                console.log(check);
                if(check.status == false)
                {
                    Materialize.toast(check.msg, 2000);
                    return;
                }

                var screen_2_render = new this.component_screen_2(this);
                var screen_2_object = screen_2_render.init(object_ref);

                body_div.innerHTML = '';
                body_div.appendChild(screen_2_object);

                $(document).ready(function ()
                {
                    screen_2_render.add_logic_to_form();
                    $('select').material_select();
                    screen_2_render.add_logic_to_form();
                });


                break;
            }
            case 'screen_1': {

                var screen_1_render = new this.component_screen_1(this);
                var screen_1_object = screen_1_render.init();

                body_div.innerHTML = '';
                body_div.appendChild(screen_1_object);
                break;
            }
            case 'screen_3': {
                var screen_3_render = new this.component_screen_3(this);
                var screen_3_object = screen_3_render.init();

                body_div.innerHTML = '';
                body_div.appendChild(screen_3_object);
                break;
            }
        }

        //Visualize for selection
        for (var i in header_items1) {
            header_items1[i].className = 'left cart_dialog_header_item';
        }

        for (var i = 0; i <= header_items.length - 1; i++) {
            header_items[i].className = 'left cart_dialog_header_item';
            if (header_items[i].getAttribute('data-id') == screen) {
                header_items[i].className = 'left cart_dialog_header_item_enabled';
            }
        }

        function check_business_rules(screen,object_ref)
        {
            switch(screen)
             {
                case 'screen_1':
                {
                    // console.log('check in rules for screen_1');
                    // console.log(object_ref.cart_object.cart_sum);
                    if((object_ref.cart_object.cart_sum!=null)&&(object_ref.cart_object.cart_sum!=0))
                    {
                        var error = {};
                        error.status = true;
                        error.msg = '';
                        return(error);
                    }
                    else
                    {
                        var error = {};
                        error.status = false;
                        error.msg = 'Ваша корзина пуста, положите в нее немного чая';
                        return(error);
                    }
                }
             }
        }
    }
}


/*
 var cart_dialog_object = new cart_dialog_class(cart_dialog_object);
 cart_dialog_object.target = 'place_for_cart_dialog';
 cart_dialog_object.init(cart_dialog_object);
 */