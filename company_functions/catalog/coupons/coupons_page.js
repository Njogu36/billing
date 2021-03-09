const mongojs = require('mongojs')
const coupons_page = (req,res)=>{
    const db_name = req.user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name);
    const Subscription = db.collection("subscriptions");
    const Coupon = db.collection("coupons");
    const Currency = db.collection("currencies")
    Subscription.find({},(err,subscriptions)=>{
        Coupon.find({},(err,coupons)=>{
            Currency.findOne({},(err,currency)=>{
                res.render("./company/catalog/coupons.jade",{
                    user:req.user,
                    currency:currency,
                    coupons:coupons,
                    subscriptions:subscriptions
                })
            })

        })
    })
    
}
module.exports = {
    coupons_page:coupons_page
}