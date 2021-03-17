const mongojs = require('mongojs')
const main_db = mongojs("mongodb://localhost/main_db_")
const User = main_db.collection("users")
const subscription = (req,res)=>{
   
    

    const {product_id,vendor_id,quantity,email}=req.params;

   
    User.findOne({vendor_id:parseInt(vendor_id)},(err,user)=>{
       
        
              
        if(user)
        {
            
            const db = mongojs("mongodb://localhost/"+user.db_name);
            const Product = db.collection("products");
            const Feature = db.collection("features")
            const Coupon  = db.collection('coupons')
            const Subscriber = db.collection('subscribers')
            Coupon.find({status:'Active'},(err,coupons)=>{
            Subscriber.findOne({email:email},(err,subscriber)=>{
           
            Product.findOne({product_id:parseInt(product_id)},(err,product)=>{
               
                if(product)
                {
                            Feature.find({product_id:mongojs.ObjectId(product._id)},(err,features)=>{
                                res.render("./custom/subscription.jade",{
                                    user:user,
                                    product:product,
                                    features:features,
                                    vendor_id:true, 
                                    product_id:true,
                                    vendorID:vendor_id,
                                    productID:product_id,
                                    quantity:quantity,  
                                    userID:email,
                                    subscriber:subscriber,
                                    coupons:JSON.stringify(coupons)
                                                 
                              })  
                            })
                }
                else
                {
                    res.render("./custom/subscription.jade",{
                        user:user,
                        product:{},
                        features:{},
                        vendor_id:true, 
                        product_id:false ,
                        vendorID:vendor_id,
                        productID:product_id,
                        quantity:quantity,
                        userID:email,
                        subscriber:subscriber,
                        coupons:JSON.stringify(coupons)
                              
                  })          
                }
            })
        })
        })
        }
        else
        {
            res.render("./custom/subscription.jade",{
                user:{},
                product:{},
                features:{},
                vendor_id:false, 
                product_id:false, 
                userID:email ,
                subscriber:subscriber,
                coupons:[]
                 
          })  
        }
      
  
    }) 
}

module.exports = {
    subscription:subscription
}