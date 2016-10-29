var database_map={
    image_src:{
        tag:"img",
        content_src:"src",//в этом случае прописываем setAttribute
        class:"search-dashed search-item-image"
    },
    name:{
        tag:"div",
        class:"search-dashed search-item-title"
    },
    label:{
        tag:"div",
        class:"search-dashed search-item-label"
    },
    price:{
        tag:"div",
        class:"search-dashed search-item-price"
    },
    description:{
        tag:"div",
        class:"search-dashed search-item-description"
    },
    score:{
        tag:"div",
        class:"search-dashed settings"
    }
};
var quickSearchObject=
{
    field1:"name",
    field2:"label",
    field3:"image_src"
}