const mongojs = require('mongojs');
const fs = require('fs')
const delete_product = (req,res)=>{
    const id = req.params.id
    const db_name = req.user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name);
    const Product =db.collection("products");
    const query  = {
        _id:mongojs.ObjectId(id)
    }
    Product.findOne(query,(err,product)=>{
       if(product.product_icon !=="/assets/images/icon.png")
       {
           fs.unlinkSync("/uploads"+product.product_icon)
       }
       Product.remove(query,()=>{
           req.flash('danger',"Product deleted successfully.");
           res.redirect("/company/products")
       })
    })
}
module.exports  = {
    delete_product:delete_product
}