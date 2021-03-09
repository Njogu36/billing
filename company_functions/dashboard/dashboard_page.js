const dashboard_page = (req,res)=>{
    res.render('./company/dashboard/dashboard.jade',{
        user:req.user
    })
}
module.exports = {
    dashboard_page:dashboard_page
}