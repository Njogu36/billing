const mongoose= require('mongoose');
const productSchema =mongoose.Schema({
    product_id:Number,
    product_name:String,
    product_icon:String,
    checkout_custom_message:String,
    product_description:String,
    fulfilment_method:String,
    product_link:String,
    status:String,
    subscription_plans:[],
    created_on:String
})
const Product = mongoose.model("Product",productSchema);
module.exports = Product