const mongojs = require('mongojs')
const alerts_webhooks = (req,res)=>{
    const db_name = req.user.db_name;
    const db =mongojs("mongodb://localhost/"+db_name);
    const AlertWebhook = db.collection('alertwebhooks')
    AlertWebhook.findOne({},(err,y)=>{
        if(y)
        {
            res.render('./company/developer_tools/alert_webhooks.jade',{
                y:y,
                user:req.user
            })
        }
        else
        {
            let data = {
                "email" : "",
                "webhook" : "",
                "subscription_created" : [ ],
                "subscription_payment_success" : [ ],
                "subscription_payment_failed" : [ ],
                "subscription_payment_refunded" : [ ]
            }
            AlertWebhook.save(data,()=>{
                AlertWebhook.findOne({},(err,y)=>{
                    res.render('./company/developer_tools/alert_webhooks.jade',{
                        y:y,
                        user:req.user
                    })
                })
            })

        }
         
    })

}
module.exports = {
    alerts_webhooks:alerts_webhooks
}