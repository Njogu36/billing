const mongojs = require('mongojs');
const db = mongojs("mongodb://localhost/main_db_");
const User = db.collection("users")
const team_member_page = (req,res)=>{
    const company_name =req.user.company_name
    User.find({company_name:company_name,type:'Company'},(err,users)=>{
        console.log(users)
         res.render('./company/business_accounts/team_members.jade',{
             user:req.user,
             users:users
         })
    })
}
module.exports = {
    team_member_page:team_member_page
}