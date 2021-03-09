const mongojs = require('mongojs')
const db = mongojs('mongodb://localhost/main_db_')
const User = db.collection('users')

const delete_team_member = (req,res)=>{
    const id = req.params.id;
    User.remove({_id:mongojs.ObjectId(id)},(err)=>{
req.flash('danger','User deleted successfully.')
res.redirect('/company/team_members')
    })
}

module.exports = {
    delete_team_member:delete_team_member
}