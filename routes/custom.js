const express = require('express');
const router = express.Router();


// CUSTOM FUNCTIONS
const subscription = require('../custom_functions/subscription_plans/custom_subscription')

router.get('/:product_id/:vendor_id',subscription.subscription)

// CDN
router.get('/subscription.js',(req,res)=>{
   
    res.sendFile(__dirname,'public/custom/js/subscription.js')
})


module.exports = router