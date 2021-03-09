const mongojs =  require('mongojs')
const db = mongojs("mongodb://localhost/main_db_")
const Currency = db.collection("currencies")
const add_new_currency = (req,res)=>{
    const {currency}= req.body
    Currency.findOne({name:currency},(err,exist)=>{
        if(exist)
        {
            req.flash('danger','Currency already exist.')
            res.redirect('/administrator/settings')
        }
        else
        {
            let data = {};
            data.name = currency;
            Currency.save(data,()=>{
                req.flash('info','Currency saved successfully.')
                res.redirect('/administrator/settings')
            })
        }
    })
  
}
module.exports = {
    add_new_currency:add_new_currency
}