const mongojs = require('mongojs');
const transaction_page = (req,res)=>{
    const db_name = req.user.db_name;
    const db =  mongojs("mongodb://localhost/"+db_name)
    const Transaction = db.collection("transactions");
    Transaction.find({}).sort({id:-1}).toArray((err,transactions)=>{
        res.render('./company/transaction/transaction.jade',{
            user:req.user,
            transactions:transactions
        })
    })

}
module.exports = {
    transaction_page:transaction_page
}