const mongojs = require('mongojs');
const delete_coupon = (req,res)=>{
    const id = req.params.id
    const db_name = req.user.db_name;
    const db = mongojs('mongodb://localhost/'+db_name);
    const Coupon = db.collection("coupons");
    Coupon.remove({_id:mongojs.ObjectId(id)},(err)=>{
req.flash('danger',"Coupon deleted successfully.");
res.redirect('/company/coupons')
    })
}
module.exports ={
    delete_coupon:delete_coupon
}