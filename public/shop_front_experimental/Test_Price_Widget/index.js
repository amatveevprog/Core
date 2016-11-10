var PriceSlider = document.getElementById('price_widget_div');

noUiSlider.create(PriceSlider,
    {
        start:[10,30],
        connect:true,
        step:1,
        range:{
            'min':-20,
            'max':40
        }
    });