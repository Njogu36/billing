const mongoose = require('mongoose');
const planSettingSchema = mongoose.Schema({
    header_background_color:String,
    header_text_color:String,
    header_text_alignment:String,
    body_background_color:String,
    list_background_color:String,
    list_text_color:String,
    list_text_alignment:String,
    price_text_color:String,
    footer_background_color:String,
    button_background_color:String,
    button_text_color:String,
    button_alignment:String,
})
const PlanSettings = mongoose.model("PlanSettings",planSettingSchema);
module.exports = PlanSettings