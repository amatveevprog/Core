/**
 * Created by alexander_bondarik on 22.01.17.
 */
const webpack = require('webpack');
module.exports = {
 context: __dirname +'/public',
  entry: './shop_front_experimental/bundle_entry_point.js',
    output:{
     path:'./public/SHOP_FRONT_PRODUCTION',
     filename:'bundle.js'
    },
   plugins:[

   ]

};

/*module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        warnings:true,
        drop_console:false,
        unsafe:false
    })
);
*/