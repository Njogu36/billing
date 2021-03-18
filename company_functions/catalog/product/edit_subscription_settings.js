const mongojs = require('mongojs');

const edit_subscription_settings = (req,res)=>{
    const id = req.params.id
    const db_name = req.user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name);
    const PlanSetting  = db.collection("plansettings");
    const Product = db.collection("products")
    const {  header_background_color,
        header_text_color,
        header_text_alignment,
        body_background_color,
        list_background_color,
        list_text_color,
        list_text_alignment,
        price_text_color,
        footer_background_color,
        button_background_color,
        button_text_color,
        button_alignment} = req.body;
    PlanSetting.findOne({no:1,product:id},(err,plan)=>{
        Product.findOne({_id:mongojs.ObjectId(id)},(err,product)=>{
        if(plan)
        {
            let query = {
                _id:mongojs.ObjectId(plan._id)
            }
            let data = {
                header_background_color:header_background_color,
                header_text_color:header_text_color,
                header_text_alignment:header_text_alignment,
                body_background_color:body_background_color,
                list_background_color:list_background_color,
                list_text_color:list_text_color,
                list_text_alignment:list_text_alignment,
                price_text_color:price_text_color,
                footer_background_color:footer_background_color,
                button_background_color:button_background_color,
                button_text_color:button_text_color,
                button_alignment:button_alignment
              };
              PlanSetting.update(query,{$set:data},()=>{
                  req.flash('info',"Saved successfully.")
                  res.redirect('/company/view_product/'+id)
              })
        }
        else
        {
          let data = {
            no:1,
            product:product.product_id,
            header_background_color:header_background_color,
            header_text_color:header_text_color,
            header_text_alignment:header_text_alignment,
            body_background_color:body_background_color,
            list_background_color:list_background_color,
            list_text_color:list_text_color,
            list_text_alignment:list_text_alignment,
            price_text_color:price_text_color,
            footer_background_color:footer_background_color,
            button_background_color:button_background_color,
            button_text_color:button_text_color,
            button_alignment:button_alignment
          };
          PlanSetting.save(data,()=>{
            req.flash('info',"Saved successfully.")
            res.redirect('/company/view_product/'+id)
          })

        }
    })
})
}
module.exports = {
    edit_subscription_settings:edit_subscription_settings
}