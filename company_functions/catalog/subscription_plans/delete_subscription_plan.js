const mongojs = require('mongojs')
const fs = require("fs")
const delete_subscription_plan = (req,res)=>{
   const id = req.params.id
   const db_name = req.user.db_name
   const db = mongojs("mongodb://localhost/"+db_name);
   const Subscription = db.collection('subscriptions')
   Subscription.findOne({_id:mongojs.ObjectId(id)},(err,sub)=>{
      if(sub.icon!=='/assets/images/plan_icon.png')
       {
        let path = "uploads"+sub.icon
        fs.unlinkSync(path)
       }
    
     Subscription.remove({_id:mongojs.ObjectId(id)},(err)=>{
        req.flash('danger','Subscription plan deleted successfully.');
        res.redirect('/company/subscription_plans')
    })
   })
   
}
module.exports = {
    delete_subscription_plan:delete_subscription_plan
}
