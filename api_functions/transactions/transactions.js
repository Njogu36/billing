const mongojs = require('mongojs');
const list_of_transactions = (req,res)=>{
    const user = res.locals.user;
    const db_name = user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name);
    const Transaction = db.collection("transactions");
    Transaction.find({},(err,transactions)=>{
        if(err)
        {
            return res.status(500).json({message:'Server Error.'})
        }
        else if(transactions.length <1)
        {
            return res.status(401).json({message:"No Transactions Found."})
        }
        else if(transactions.length>0)
        {
            return res.status(200).json({status:"Success",message:"List of all transactions.",database:db_name,transactions:transactions})
        }
    })
}
module.exports = {
    list_of_transactions
}