const mongojs = require('mongojs');

const delete_feature = (req,res)=>{
  const {id,id2} =req.params
  const db_name = req.user.db_name;
  const db = mongojs("mongodb://localhost/"+db_name);
  const Feature = db.collection("features")
  const query = {
      _id:mongojs.ObjectId(id2)
  }
  Feature.remove(query,(err)=>{
      req.flash('danger','Feature removed from list.')
      res.redirect('/company/view_product/'+id)
  })
}
module.exports = {
    delete_feature:delete_feature
}