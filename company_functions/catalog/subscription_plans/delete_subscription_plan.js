const mongojs = require('mongojs')
const fs = require("fs")
const delete_subscription_plan = (req,res)=>{
   const id = req.params.id
   const db_name = req.user.db_name
   const db = mongojs("mongodb://localhost/"+db_name);
   const Subscription = db.collection('subscriptions')
   const Product = db.collection('products')
   const Feature = db.collection('features')
   Subscription.findOne({_id:mongojs.ObjectId(id)},(err,sub)=>{
      if(sub.icon!=='/assets/images/icon.png')
       {
        let path = "uploads"+sub.icon
        fs.unlinkSync(path)
       }

      
     Feature.remove({plan_name:sub.plan_name})
     Product.find({},(err,products)=>{
        products.map((item)=>{
                if(item.subscription_plans.length>0)
                {
                   let array = item.subscription_plans;
                   let new_plans = array.filter((x)=>{
                      return x.plan_name !== sub.plan_name
                   })
                   let query = {
                      _id:mongojs.ObjectId(item._id)
                   }
                   let data = {};
                   data.subscription_plans = new_plans;
                   Product.update(query,{$set:data})
                }
        })
     })
     
    
    
     Subscription.remove({_id:mongojs.ObjectId(id)},(err)=>{
        req.flash('danger','Subscription plan deleted successfully.');
        res.redirect('/company/subscription_plans')
    })
   })
   
}
module.exports = {
    delete_subscription_plan:delete_subscription_plan
}
