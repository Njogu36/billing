const express = require('express');
const router = express.Router();


// CUSTOM FUNCTIONS
const subscription = require('../custom_functions/subscription_plans/custom_subscription')
const PAYNOW = require('../custom_functions/paynow/pay_now')

router.get('/:product_id/:vendor_id/:quantity/:email',subscription.subscription)

// CDN
router.get('/subscription.js',(req,res)=>{
    res.sendFile(__dirname,'public/custom/js/subscription.js')
})
router.post("/pay_now",PAYNOW.pay_now)

module.exports = router