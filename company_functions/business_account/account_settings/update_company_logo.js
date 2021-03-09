const mongojs = require('mongojs');
const fs = require('fs')
const db = mongojs("mongodb://localhost/main_db_");
const User = db.collection('users')
const update_company_logo = (req,res)=>{
 const path = "/logos/"+req.file.filename
 
 fs.unlinkSync("uploads"+req.user.company_icon)

 let query  = {
     "company_name":req.user.company_name
 }
 let data = {};
 data.company_icon = path;
 User.update(query,{$set:data},()=>{
   req.flash('info','Logo updated successfully.')
   res.redirect('/company/account_settings')
 })
}
module.exports = {
    update_company_logo:update_company_logo
}