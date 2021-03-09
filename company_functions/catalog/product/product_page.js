const mongojs = require('mongojs')
const product_page = (req,res)=>{
    const db_name = req.user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name)
    const Product = db.collection("products")
    Product.find({},(err,products)=>{
        res.render("./company/catalog/products.jade",{
            user:req.user,
            products:products
        })
    })
}
module.exports ={
    product_page:product_page
}