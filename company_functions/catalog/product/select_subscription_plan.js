const mongojs = require('mongojs')
const select_subscription_plan = (req,res)=>{
 const  {plan_name }= req.body
 const db_name =req.user.db_name;
 const id = req.params.id;
 const db  = mongojs("mongodb://localhost/"+db_name);
 const Product = db.collection("products");
 const Subscription = db.collection("subscriptions");
 const query = {
    _id:mongojs.ObjectId(id)
   }
 Subscription.findOne({plan_name:plan_name},(err,subscription)=>{
    Product.findOne(query,(err,product)=>{
        let old_array = product.subscription_plans;
        let filter = old_array.filter((x)=>{
         return x.plan_name === plan_name
        })
        if(filter.length>0)
        {
           req.flash("danger","Subscription plan already exists.");
           res.redirect("/company/view_product/"+id)
        }
        else
        {

        let new_array = [];
        let obj = {
            more_details:subscription,
            plan_name:plan_name,
            no:old_array.length + 1,
            features:[]
        }
        new_array.push(obj)
        let data = {};
        data.status = 'Active'
        data.subscription_plans = old_array.concat(new_array);
        Product.update(query,{$set:data},()=>{
         req.flash("info","Subscription Saved Successfully.");
         res.redirect("/company/view_product/"+id)
        })
    }
      })
 })
}
module.exports = {
    select_subscription_plan:select_subscription_plan
}