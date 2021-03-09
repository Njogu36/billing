const mongojs =  require('mongojs')
const db = mongojs("mongodb://localhost/main_db_")
const Currency = db.collection("currencies")
const settings_page = (req,res)=>{
    Currency.find({},(err,currencies)=>{
        res.render("./administrator/settings/settings.jade",{
            user:req.user,
            currencies:currencies
        })
    })
}
module.exports = {
    settings_page:settings_page
}