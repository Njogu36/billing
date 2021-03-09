const mongojs = require('mongojs');

const add_new_product = (req,res)=>{
    const { product_name,checkout_custom_message,product_description,product_link } = req.body
    const db_name = req.user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name)
    const random_val = Math.floor(100000 + Math.random() * 900000)
    const Product = db.collection("products")
    let path =''
    Product.findOne({product_name:product_name},(err,product)=>{
        if(product)
        {
            req.flash('danger','Product already exists.');
            res.redirect('/company/products')
        }
        else
        {
            if(req.file ===undefined)
            {
               path = "/assets/images/icon.png"
            }
            else if(req.file !== undefined)
            {
                path = "/products/"+req.file.filename
            }
           
            let data = {};
            data.product_id =random_val
            data.product_name = product_name
            data.checkout_custom_message = checkout_custom_message
            data.product_description = product_description
            data.product_icon = path
            data.status = 'Inactive'
            data.product_link = product_link
            data.subscription_plans =[]
            data.fulfilment_method = "Send a license key to user after payment is successfully completed."
            data.created_on = new Date()
            Product.save(data,()=>{
                    req.flash('info',"Product saved successfully.");
                    res.redirect('/company/products')
            })

        }
    })
}
module.exports = {
    add_new_product:add_new_product
}