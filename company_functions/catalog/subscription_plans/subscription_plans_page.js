const mongojs = require('mongojs');

const subscription_plans_page = (req,res)=>{
    const db_name = req.user.db_name;
    const main_db = mongojs('mongodb://localhost/main_db_')
    const Currency = main_db.collection("currencies")
    const db = mongojs("mongodb://localhost/"+db_name)
    const Company_currency = db.collection("currencies")
    const Subscription  = db.collection("subscriptions")

    Subscription.find({},(err,subscriptions)=>{
        Currency.find({},(err,currencies)=>{
            Company_currency.findOne({},(err,currency)=>{
                res.render("./company/catalog/subscription_plans.jade",{
                    user:req.user,
                    subscriptions:subscriptions,
                    currencies:currencies,
                    currency:currency
                })
            })
        })
    })
}
module.exports = {
    subscription_plans_page:subscription_plans_page
}