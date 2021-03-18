const mongoose = require('mongoose');
const transactionSchema = mongoose.Schema({
     product:{},
     plan:{},
     orderNo:Number,
     type:String,
     customer:String,
     total:Number,
     currency:String,
     added_on:String,
     status:String,
     year_month:String,
     time:String,
     created_on:String
})
const Transaction = mongoose.model("Transaction",transactionSchema);
module.exports = Transaction