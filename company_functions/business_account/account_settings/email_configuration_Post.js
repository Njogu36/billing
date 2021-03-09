const mongojs = require("mongojs");

const email_configuration_post = (req, res) => {
  const { email, host, password } = req.body;
  console.log(req.body)
  const db_name = req.user.db_name;
  const db = mongojs("mongodb://localhost/" + db_name);
  const Email = db.collection("emails");
  
  Email.findOne({}, (err, email_) => {
      console.log(email)
    if (email_) {
         let query = {
             _id:mongojs.ObjectId(email_._id)
         }
        let data = {}
        data.email = email
        data.host = host
        data.pass = password
        Email.update(query,{$set:data},()=>{
            req.flash('info','Email configuration updated successfully.');
            res.redirect('/company/account_settings')
         })
    } else {
        let data = {}
        data.email = email
        data.host = host
        data.pass = password
        Email.save(data,()=>{
           req.flash('info','Email configuration saved successfully.');
           res.redirect('/company/account_settings')
        })
    }
  });
};
module.exports = {
  email_configuration_post: email_configuration_post,
};
