const mongojs = require('mongojs');
const get_plan_details = (req,res)=>{
const id = req.params.id;
const no = req.params.no;
const db_name = req.user.db_name;
const db = mongojs("mongodb://localhost/"+db_name);
const Product = db.collection("products");
let query = {
    _id:mongojs.ObjectId(id)
}
Product.findOne(query,(err,product)=>{
    let array = product.subscription_plans
    let obj  = {}
    array.map((item)=>{
        if(parseInt(item.no) === parseInt(no))
        {
            obj = item
        }
    })
    res.send({success:true,plan:obj})
})
}
module.exports = {
    get_plan_details:get_plan_details
}