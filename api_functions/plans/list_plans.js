const mongojs = require('mongojs');
const list_of_subscriptions = (req,res)=>{
    const user = res.locals.user;
    const db_name = user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name);
    const Subscription = db.collection("subscriptions");
    Subscription.find({},(err,subscriptions)=>{
        if(err)
        {
            return res.status(500).json({message:'Server Error.'})
        }
        else if(subscriptions.length <1)
        {
            return res.status(401).json({message:"No Subscription Plans Found."})
        }
        else if(subscriptions.length>0)
        {
            return res.status(200).json({status:"Success",message:"List of all subscription plans.",database:db_name,subscription_plans:subscriptions})
        }
    })
}
module.exports = {
    list_of_subscriptions
}