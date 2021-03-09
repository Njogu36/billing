const mongoose = require('mongoose');
const currencySchema =mongoose.Schema({
 name:String
})
const Currency = mongoose.model('Currency',currencySchema);
module.exports = Currency