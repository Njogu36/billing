const mongojs = require('mongojs');

const list_products = (req,res)=>{
    const user = res.locals.user;
    const db_name = user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name);
    const Product = db.collection("products")
    Product.find({},(err,products)=>{
        if(err)
        {
            return res.status(500).json({message:"Server Error."})
        }
        if(products.length<1)
        {
            return res.status(401).json({message:'No Products Found.'})
        }
        else if(products.length > 0)
        {
            return res.status(200).json({status:"Success",message:"List of all products.",database:db_name,products:products,})
        }
    })
}

module.exports = {
    list_products:list_products
}