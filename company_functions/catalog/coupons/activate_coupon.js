const mongojs = require('mongojs')
const activate_coupon = (req,res)=>{
    const id = req.params.id;
    const db_name = req.user.db_name
    const db = mongojs("mongodb://localhost/"+db_name);
    const Coupon = db.collection("coupons");
    const query ={
        _id:mongojs.ObjectId(id)
    }
    let data = {};
    data.status = "Active"
    Coupon.update(query,{$set:data},()=>{
        req.flash("info","Coupon activated.");
        res.redirect('/company/coupons')
    })

}
module.exports = {
    activate_coupon:activate_coupon
}