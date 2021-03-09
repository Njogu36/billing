const mongojs = require('mongojs');
const add_new_coupon = (req,res)=>{
    const db_name = req.user.db_name;
    const db  = mongojs("mongodb://localhost/"+db_name);
    const Coupon = db.collection("coupons");
    const { code, description, discount_type, discount_amount,default_currency, discount_percentage,allowed_uses, expiry_date,subscription_plans } = req.body;
   console.log(subscription_plans)
    Coupon.findOne({code:code},(err,coupon)=>{
        if(coupon)
        {
          req.flash("danger","Coupon already exists.");
          res.redirect("/company/coupons")
        }
        else if(subscription_plans===undefined)
        {
            req.flash("danger","Kindly choose one or multiple subscription plans")
            res.redirect('/company/coupons')
        }
       
        else
        {

            
            let data = {}
            data.code = code
            data.description = description;
            data.discount_type = discount_type;
            if(discount_type === 'Percentage')
            {
            
             data.discount_amount = 0;
             data.default_currency = ""
             data.discount_percentage =  discount_percentage
            }
            else if(discount_type === 'Flat')
            {
                data.discount_amount = discount_amount;
                data.default_currency = default_currency
                data.discount_percentage =  0
            }
            data.allowed_uses = allowed_uses;
            data.expiry_date = expiry_date;
            data.status = 'Active'
            if(Array.isArray(subscription_plans))
            {
              data.subscription_plans =  subscription_plans
            }
            else if(!Array.isArray(subscription_plans))
            {
                 data.subscription_plans = [subscription_plans]
            }
            Coupon.save(data,()=>{
                 req.flash('info',"Coupon saved successfully.");
                 res.redirect("/company/coupons")
            })
        }
    })
}
module.exports = {
    add_new_coupon:add_new_coupon
}