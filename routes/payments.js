const express = require('express');
const route = express.Router();

route.post('/confirmation_url',(req,res)=>{
    //https://2b2cdb813ab7.ngrok.io/payments/mpesa_confirmation_url
console.log(req.body)
})
route.post('/validation_url',(req,res)=>{
    //https://2b2cdb813ab7.ngrok.io/payments/mpesa_validation_url
    console.log(req.body)
})

module.exports =  route;