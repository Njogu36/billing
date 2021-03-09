const mongojs = require('mongojs')
const balance_currency_page = (req,res)=>{
    const db_name = req.user.db_name;
    const db = mongojs("mongodb://localhost/main_db_")
    const my_db = mongojs('mongodb://localhost/'+db_name)
  
    const Currency = db.collection('currencies')
    const My_currency = my_db.collection('currencies')
    My_currency.find({},(err,currencies)=>{
        if(currencies.length>0)
        {
         
        }
        else
        {
            let data = {};
           if(req.user.country === 'Kenya')
           {
            data.name = 'KES'
           }
           else if(req.user.country !=='Kenya')
           {
            data.name = 'USD'
           }
           My_currency.save(data,()=>{

           })
           
        }
    })
    setTimeout(()=>{
        Currency.find({},(err,currencies)=>{
            My_currency.findOne({},(err,currency)=>{

            res.render('./company/business_accounts/balance_currency.jade',{
                user:req.user,
                currencies:currencies,
                currency:currency
            })
        })
    })
    },2000)

}
module.exports = {
    balance_currency_page:balance_currency_page
}