const mongojs = require('mongojs');
const manage_subscriber = (req,res)=>{
  const db_name = req.user.db_name;
  const db = mongojs("mongodb://localhost/"+db_name);
  const Subscriber = db.collection("subscribers");
  const { id }= req.params;
  const query = {
      _id:mongojs.ObjectId(id)
  }
  Subscriber.findOne(query,(err,subscriber)=>{
      res.render('./company/customers/manage_subscriber.jade',{
          user:req.user,
          subscriber:subscriber
      })
  })
}
module.exports = {
    manage_subscriber:manage_subscriber
}