const mongoose = require('mongoose');
const couponSchema = mongoose.Schema({
    code:String,
    description:String,
    discount_type:String,
    default_currency:String,
    discount_amount:Number,
    discount_percentage:Number,
    allowed_uses:Number,
    expiry_date:String,
    status:String,
    subscription_plans:[],
    created_on:String
})
const Coupon = mongoose.model('Coupon',couponSchema);
module.exports = Coupon