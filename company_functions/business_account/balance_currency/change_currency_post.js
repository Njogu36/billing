const mongojs = require('mongojs');
const change_currency_post = (req,res)=>{
    const db_name  =req.user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name)
    const Currency = db.collection('currencies');
    Currency.findOne({},(err,currency)=>{
        if(req.body.radio ===undefined)
        {
          req.flash('danger','Currency is required.')
          res.redirect('/company/balance_currency')
        }
        else
        {

        if(currency)
        {
            let query = {
                _id:mongojs.ObjectId(currency._id)
            }
            let data = {}
            data.name = req.body.radio
            Currency.update(query,{$set:data},()=>{
                req.flash('info','Currency updated successfully.')
                res.redirect('/company/balance_currency')
            })
        }
    }
    })
}
module.exports = {
    change_currency_post:change_currency_post
}