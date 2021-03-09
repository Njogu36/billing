const mongojs = require('mongojs')
const add_new_feature = (req,res)=>{
  const id = req.params.id
  const { no,feature } = req.body;
  const db_name = req.user.db_name;
  const db = mongojs("mongodb://localhost/"+db_name);
  const Product = db.collection('products');
  const Feature = db.collection("features")
  let query = {
      _id:mongojs.ObjectId(id)
  }
  Product.findOne(query,(err,product)=>{
          let filterPlan = product.subscription_plans.filter((x)=>{
              return x.no === parseInt(no)
          })
          if(filterPlan.length>0)
          {
            const plan_name = filterPlan[0].plan_name
            const product_id = product._id 
            Feature.findOne({plan_name:plan_name,product_id:product_id,name:feature},(err,feature_)=>{
                if(feature_)
                {
                     req.flash('danger',"Feature already exists.");
                     res.redirect('/company/view_product/'+id)
                }
                else
                {
                    let data = {};
                    data.plan_name = plan_name;
                    data.product_id = product_id;
                    data.name = feature
                    Feature.save(data,()=>{
                        req.flash('info',"Feature saved successfully.")
                        res.redirect('/company/view_product/'+id)
                    })
                }

            })
          }
          else
          {

          }
  })
}
module.exports = {
    add_new_feature:add_new_feature
}