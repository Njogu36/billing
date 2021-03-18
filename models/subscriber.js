const mongoose = require("mongoose");
const subscriberSchema = mongoose.Schema({
    subscriber_id:Number,
    email:String,
    fullname:String,
    status:String,
    quantity:Number,
    product:{},
    subscription_plan:{},
    last_payment:[],
    next_payment:[],
    quantityList:[],
    order:[],
    added_on:String,
})
const Subscriber = mongoose.model("Subscriber",subscriberSchema);
module.exports = Subscriber