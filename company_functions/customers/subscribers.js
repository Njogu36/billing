const mongojs = require('mongojs')
const subscriber_page = (req,res)=>{
    const db_name = req.user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name);
    const Subscriber = db.collection('subscribers');
    Subscriber.find({},(err,subscribers)=>{
          res.render("./company/customers/subscribers.jade",{
              user:req.user,
              subscribers:subscribers
          })
    })
}
module.exports = {
    subscriber_page:subscriber_page
}