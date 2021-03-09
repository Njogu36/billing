const mongojs = require('mongojs')
const account_settings_page = (req, res) => {
  const db = mongojs("mongodb://localhost/"+req.user.db_name)
  const Email = db.collection('emails')
  
  Email.findOne({},(err,email)=>{
      if(!email)
      {

        let data = {}
        data.email = ""
        data.host = ""
        data.pass = ""
        Email.save(data,()=>{

        })
      }
  })
setTimeout(()=>{
  Email.findOne({},(err,email)=>{
  res.render("./company/business_accounts/account_setting.jade", {
    user: req.user,
    email:email
  });
},3500)
})
  
};
module.exports = {
  account_settings_page: account_settings_page,
};
