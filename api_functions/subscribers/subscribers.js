const mongojs = require('mongojs');
const list_of_subscribers = (req,res)=>{
    const user = res.locals.user;
    const db_name = user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name);
    const Subscriber = db.collection("subscribers");
    Subscriber.find({},(err,subscribers)=>{
        if(err)
        {
            return res.status(500).json({message:'Server Error.'})
        }
        else if(subscribers.length <1)
        {
            return res.status(401).json({message:"No Subscribers Found."})
        }
        else if(subscribers.length>0)
        {
            return res.status(200).json({status:"Success",message:"List of all subscribers.",database:db_name,subscribers:subscribers})
        }
    })
}
module.exports = {
    list_of_subscribers
}