const mongojs = require('mongojs')
const db = mongojs("mongodb://localhost/main_db_")
const User = db.collection("users")
const get_team_member_details = (req,res)=>{
    const id = req.params.id
    User.findOne({_id:mongojs.ObjectId(id)},(err,user)=>{
          res.send({user:user})
    })
}
module.exports = {
    get_team_member_details:get_team_member_details
}