const mongojs = require('mongojs');
const subscriber = (req,res)=>{
    const email = req.params.email;
    const user = res.locals.user;
    const db_name = user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name);
    const Subscriber = db.collection("subscribers");
    Subscriber.findOne({email:email},(err,subscriber)=>{
        if(err)
        {
            return res.status(500).json({message:'Server Error.'})
        }
        else if(!subscriber)
        {
            return res.status(401).json({message:"No Subscriber Found."})
        }
        else if(subscriber)
        {
            return res.status(200).json({status:"Success",message:"Specific subscriber",database:db_name,subscriber:subscriber})
        }
    })
}
module.exports = {
    subscriber
}