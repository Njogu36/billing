const e = require('express');
const mongojs = require('mongojs');
const  alert_webhooks_post = (req,res)=>{
    const db_name = req.user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name)
    const AlertWebhook = db.collection("alertwebhooks")
    const {email, webhook,subscription_created,subscription_payment_success,subscription_payment_failed,subscription_payment_refunded } = req.body;
     AlertWebhook.findOne({},(err,x)=>{
         console.log(subscription_payment_refunded)
         if(x)
         {
             let query = {
                 _id:mongojs.ObjectId(x._id)
             }
            let data = {};
             data.email = email;
             data.webhook = webhook
             if(Array.isArray(subscription_created))
             {
              data.subscription_created = subscription_created
             }
             else if(!Array.isArray(subscription_created))
             {
                if(subscription_created===undefined)
                {
                    data.subscription_created = []
                }
                else
                {
                    data.subscription_created = [subscription_created]
                }
                
             }
             // SUBSCRIPTION PAYMENT SUCCESS
             if(Array.isArray(subscription_payment_success))
             {
                 
               data.subscription_payment_success = subscription_payment_success
             }
             else if(!Array.isArray(subscription_payment_success))
             {
                if(subscription_payment_success===undefined)
                {
                    data.subscription_payment_success = []
                }
                else
                {
                    data.subscription_payment_success = [subscription_payment_success]
                }
               
             }
             // SUBSCRIPTION PAYMENT FAILED
             if(Array.isArray(subscription_payment_failed))
             {
                data.subscription_payment_failed = subscription_payment_failed
             }
             else if(!Array.isArray(subscription_payment_failed))
             {
                 if(subscription_payment_failed===undefined)
                 {
                    data.subscription_payment_failed = []
                 }
                 else
                 {
                    data.subscription_payment_failed = [subscription_payment_failed]
                 }
                
             }
             // SUBSCRIPTION PAYMENT REFUNDED
             if(Array.isArray(subscription_payment_refunded))
             {
                  data.subscription_payment_refunded = subscription_payment_refunded
             }
             else if(!Array.isArray(subscription_payment_refunded))
             {
                 if(subscription_payment_refunded===undefined)
                 {
                    data.subscription_payment_refunded = []
                 }
                 else
                 {
                    data.subscription_payment_refunded = [subscription_payment_refunded]
                 }
                  
             }
             AlertWebhook.update(query,{$set:data},()=>{
                req.flash('info','Saved successfully.');
                res.redirect('/company/alerts_webhooks')
             })
         }
         else
         {
             
             let data = {};
             data.email = email;
             data.webhook = webhook
             if(Array.isArray(subscription_created))
             {
              data.subscription_created = subscription_created
             }
             else if(!Array.isArray(subscription_created))
             {
                if(subscription_created===undefined)
                {
                    data.subscription_created = []
                }
                else
                {
                    data.subscription_created = [subscription_created]
                }
                
             }
             // SUBSCRIPTION PAYMENT SUCCESS
             if(Array.isArray(subscription_payment_success))
             {
                 
               data.subscription_payment_success = subscription_payment_success
             }
             else if(!Array.isArray(subscription_payment_success))
             {
                if(subscription_payment_success===undefined)
                {
                    data.subscription_payment_success = []
                }
                else
                {
                    data.subscription_payment_success = [subscription_payment_success]
                }
               
             }
             // SUBSCRIPTION PAYMENT FAILED
             if(Array.isArray(subscription_payment_failed))
             {
                data.subscription_payment_failed = subscription_payment_failed
             }
             else if(!Array.isArray(subscription_payment_failed))
             {
                 if(subscription_payment_failed===undefined)
                 {
                    data.subscription_payment_failed = []
                 }
                 else
                 {
                    data.subscription_payment_failed = [subscription_payment_failed]
                 }
                
             }
             // SUBSCRIPTION PAYMENT REFUNDED
             if(Array.isArray(subscription_payment_refunded))
             {
                  data.subscription_payment_refunded = subscription_payment_refunded
             }
             else if(!Array.isArray(subscription_payment_refunded))
             {
                 if(subscription_payment_refunded===undefined)
                 {
                    data.subscription_payment_refunded = []
                 }
                 else
                 {
                    data.subscription_payment_refunded = [subscription_payment_refunded]
                 }
                  
             }
             AlertWebhook.save(data,()=>{
                     req.flash('info','Saved successfully.');
                     res.redirect('/company/alerts_webhooks')
             })
            
         }
     })

}
module.exports = {
    alert_webhooks_post:alert_webhooks_post
}