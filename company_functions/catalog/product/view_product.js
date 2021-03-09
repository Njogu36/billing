const mongojs = require('mongojs');

const view_product = (req,res)=>{
    const db_name = req.user.db_name;
    const db  = mongojs("mongodb://localhost/"+db_name);
    const Product =  db.collection("products");
    const Feature = db.collection('features')
    const Subscription = db.collection("subscriptions")
    const id = req.params.id;
    let query = {
        _id:mongojs.ObjectId(id)
    }
    Product.findOne(query,(err,product)=>{
        Subscription.find({},(err,subscriptions)=>{
            Feature.find({product_id:mongojs.ObjectId(id)},(err,features)=>{
                res.render("./company/catalog/view_product.jade",{
                    user:req.user,
                    product:product,
                    subscriptions:subscriptions,
                    features:features
                })
            })
        })
    })
}
module.exports = {
    view_product:view_product
}