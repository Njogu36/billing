const mongojs = require('mongojs');

const list_coupons = (req,res)=>{
    const user = res.locals.user;
    const db_name = user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name);
    const Coupon = db.collection("coupons")
    Coupon.find({},(err,coupons)=>{
        if(err)
        {
            return res.status(500).json({message:"Server Error."})
        }
        if(coupons.length<1)
        {
            return res.status(401).json({message:'No Coupons Found.'})
        }
        else if(coupons.length > 0)
        {
            return res.status(200).json({status:"Success",message:"List of all coupons.",database:db_name,coupons:coupons,})
        }
    })
}

module.exports = {
    list_coupons:list_coupons
}