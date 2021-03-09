const mongoose = require('mongoose');
const featureSchema = mongoose.Schema({
    name:String,
    product_id:String,
    plan_name:String
})
const Feature = mongoose.model("Feature",featureSchema);
module.exports = Feature