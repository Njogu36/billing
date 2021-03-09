const mongojs = require('mongojs')
const db = mongojs('mongodb://localhost/main_db_')

const dashboard_page = (req,res)=>{
    db.users.find({type:'Company',role:"Administrator",status:'Main'},(err,companies)=>{
        res.render('./administrator/dashboard/dashboard.jade',{
            user:req.user,
            companies:companies
        })
    })
}
module.exports = {
    dashboard_page:dashboard_page
}