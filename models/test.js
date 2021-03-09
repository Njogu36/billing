const mongoose = require('mongoose');
const testSchema = mongoose.Schema({
    first_name:String,
    
});
const Test = mongoose.model('Test',testSchema);
module.exports = Test