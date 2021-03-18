const mongojs = require('mongojs');
const bcrypt = require('bcryptjs')
const db = mongojs("mongodb://localhost/main_db_")
const User = db.collection("users")
const check_authorization = (req,res,next)=>{
    if(!req.headers.authorization)
    {
         return res.status(401).send({Message:"Missing Authorization Header"})
    }
    else if(req.headers.authorization) {
        let bcode = req.headers.authorization.split(" ");
        let dcode = Buffer.from(bcode[1], 'base64').toString()
        let username = dcode.split(":")[0]
        let password = dcode.split(":")[1]
        User.findOne({username:username,type:'Company'},(err,user)=>{
            if(user)
            {
              bcrypt.compare(password, user.password, function (err, isMatch) {
                  if (err) 
                    return res.status(500).json({message:err})
                  if (isMatch) {
                      res.locals.user = user
                      next()
                  } else {
                      return res.status(401).json({message:"Invalid Password"})
                  }
              });
            }
            else
            {
                return res.status(401).json({message:'Invalid Username'})
            }
       })
    }
}
module.exports = check_authorization