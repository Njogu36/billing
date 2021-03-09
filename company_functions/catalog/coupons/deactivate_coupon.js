const mongojs = require('mongojs')
const deactivate_coupon = (req,res)=>{
    const id = req.params.id;
    const db_name = req.user.db_name
    const db = mongojs("mongodb://localhost/"+db_name);
    const Coupon = db.collection("coupons");
    const query ={
        _id:mongojs.ObjectId(id)
    }
    let data = {};
    data.status = "Inactive"
    Coupon.update(query,{$set:data},()=>{
        req.flash("info","Coupon deactivated.");
        res.redirect('/company/coupons')
    })
}
module.exports = {
    deactivate_coupon:deactivate_coupon
}