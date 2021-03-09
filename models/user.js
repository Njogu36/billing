const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    first_name:String,
    last_name:String,
    username:String,
    company_name:String,
    company_icon:String,
    enabled:Boolean,
    role:String,
    vendor_id:Number,
    status:String,
    country:String,
    type:String,
    db_name:String,
    password:String,
});
const User = mongoose.model('User',userSchema);
module.exports = User