/**
 * Created by alexander.bondarik on 03.11.2016.
 */
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
                    className: "form_field_FirstName",
                    required: "true"
                },
                {
                    description: "Телефон",
                    name: "Phone",
                    dom_type: "input",
                    data_type: "text",
                    className: "form_field_Phone",
                    required: "true"
                },
                {
                    description: "Адрес электронной почты",
                    name: "email",
                    dom_type: "input",
                    data_type: "email",
                    className: "form_field_Email",
                    required: "true"
                },
                {
                    description: "Ваш город",
                    name: "City",
                    dom_type: "input",
                    data_type: "text",
                    className: "form_field_City",
                    required: "true"
                }
            ]
        },
        {
            name: "delivery",
            label: "Доставка",
            className: "field_group_Delivery",
            fields: [
                {
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
                    action: {
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

                    }
                }
            ]
        },
        {
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
        }
    ],
        sub_forms: [
        {
            name: "delivery_delivery",
            field_groups: [
                {
                    name: "delivery_address",
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
                            name: "Street",
                            dom_type: "input",
                            data_type: "text",
                            className: "form_field_FirstName",
                            required: "true"
                        },
                        {
                            description: "Фанарь",
                            name: "Street",
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
                    name: "delivery_address",
                    className: "field_group_delivery_adders",
                    label: "Самовывоз",
                    fields: [
                        {
                            description: "Город",
                            name: "City",
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