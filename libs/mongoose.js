console.log('ololol now there will be the error:');
var config = require('../config/config');
var mongoose = require('mongoose');


mongoose.connect(config.mongoose.uri,config.mongoose.options);
module.exports = mongoose;