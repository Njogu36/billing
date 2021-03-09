const mongoose = require('mongoose');
const subscriptionPlanSchema = mongoose.Schema({
  plan_name:String,
  checkout_message:String,
  icon:String,
  billing_interval:String,
  every:Number,
  period:String,
  trial_period:Number,
  quantity:Boolean,
  currencies:[],
  created_on:Date,
  coupon_id:String,
})
const Subscription = mongoose.model('Subscription',subscriptionPlanSchema);
module.exports = Subscription