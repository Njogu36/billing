const mongojs = require('mongojs');
const product_page = require('./product_page');
const delete_plan = (req,res)=>{
    const no = req.params.no
    const id = req.params.id;
    const db_name = req.user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name);
    const Product = db.collection("products");
    const Feature = db.collection("features")
    const query = {
        _id:mongojs.ObjectId(id)
    }
    Product.findOne(query,(err,product)=>{
        const old_array = product.subscription_plans
       
        let new_array = [];
        let filter = old_array.filter((x)=>{
            return parseInt(x.no) !== parseInt(no)
        })
      
        if(filter.length > 0)
        {
          filter.map((item)=>{
              
              if(parseInt(item.no) > 1)
              {
                item.no = item.no - 1
              }
              
          })
        }

        setTimeout(()=>{
            new_array = filter
            let data = {};
            data.subscription_plans = new_array;
            if(new_array.length===0)
            {
                data.status = 'Inactive'
            }
            Product.update(query,{$set:data},()=>{
                
                req.flash("danger","Subscription plan deleted successfully.");
                res.redirect('/company/view_product/'+id)
            })
        },2000)

    })
}
module.exports = {
    delete_plan:delete_plan
}