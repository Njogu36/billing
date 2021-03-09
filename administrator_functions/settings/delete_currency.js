const mongojs =  require('mongojs')
const db = mongojs("mongodb://localhost/main_db_")
const Currency = db.collection("currencies")
const delete_currency = (req,res)=>{
    const {currency}= req.body
    const id = req.params.id
    const query = {
        _id:mongojs.ObjectId(id)
    }
    Currency.remove(query,()=>{
       req.flash('danger','Currency deleted successfully.');
       res.redirect('/administrator/settings')
    })
}
module.exports = {
    delete_currency:delete_currency
}