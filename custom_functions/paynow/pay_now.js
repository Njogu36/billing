const mongojs = require('mongojs')
const licenseKey = require('license-key-gen');
// FUNCTIONS
const billing_interval = require('./billing_interval')
const subscription_created = require('../alerts_webhooks/subscription_created')
function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
const pay_now = (req,res)=>{
    const { vendor_id,
    product_id,
    quantity,
    price,
    currency,
    first_name,
    middle_name,
    last_name,
    plan,
    mpesa_number,
    airtel_number,
    credit_number,
    credit_expires,
    total,
    credit_cvc,email} = req.body;
    const date = new Date();
    const year = date.getFullYear();
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const today = year + "-" + month + "-" + day;
    const year_month = year + "-" + month
    const hour = addZero(date.getHours())
    const minutes = addZero(date.getMinutes())
    const seconds = addZero(date.getSeconds());
    const time = hour+":"+minutes+":"+seconds

    const db_ = mongojs("mongodb://localhost/main_db_");
    const User = db_.collection("users");
    User.findOne({vendor_id:parseInt(vendor_id)},(err,user)=>{
        const db = mongojs("mongodb://localhost/"+user.db_name);
        const Product = db.collection("products");
        const Transaction = db.collection("transactions");
        const Subscriber = db.collection("subscribers");
        let expiry_date = billing_interval.billing_interval(plan,today)
        let amount = total.replace(/\,/g,'');
        const order_random = Math.floor(100000 + Math.random() * 900000)
        const subscriber_random = Math.floor(100000 + Math.random() * 900000)
        const FilterCurrencies = plan.currencies.filter((x)=>{
            return x.default === 'true'
        })
        const userInfo = {name:first_name + " "+middle_name+" "+last_name,subscriber:email,subscriber_id:subscriber_random,date:today}
        const licenseData = {info:userInfo, prodCode:"LEN100120", appVersion:"1.5", osType:'IOS8'}
        const license = licenseKey.createLicense(licenseData)
            
        
        
        setTimeout(()=>{

        
        Product.findOne({product_id:parseInt(product_id)},(err,product)=>{
            if(product)
            {
               
                save_subscriber()
                save_transaction()


                // SAVE TRANSACTIONS
                function save_transaction()
                {
                    Transaction.findOne({orderNo:order_random},(err,transaction)=>{
                        if(transaction)
                        {
                            
                        }
                        else
                        {
                           let data = {}
                           data.orderNo = order_random;
                           data.product = product;
                           data.plan = plan
                           data.type = 'Subscription'
                           data.customer = email;
                           data.total = total;
                           data.price = price
                           data.currency = currency;
                           data.added_on = today;
                           data.time = time
                           data.status = 'Paid'
                           data.year_month=year_month;
                           data.created_on = new Date()
                           Transaction.save(data,()=>{

                           })
                        }
                    })
                }
                
                // SAVE SUBSCRIBER
                function save_subscriber()
                {
                    Subscriber.findOne({email:email},(err,subscriber)=>{
                   
                        if(subscriber)
                        {
                            let data = {
                                status:"Active",
                                quantity:parseInt(subscriber.quantity) + parseInt(quantity),
                                subscription_plan:plan,
                                last_payment:[
                                    {
                                        currency:currency,
                                        amount:amount,
                                        quantity:quantity,
                                        date:today,
                                        time:time,
                                        license:license
                                    }
                                ],
                                next_payment:[
                                    {
                                        currency:FilterCurrencies[0].currency,
                                        amount:FilterCurrencies[0].amount,
                                        expiry_date:expiry_date
                                    }
                                ],
                               
                                order:subscriber.order.concat([{
                                    order_no:order_random,
                                    amount:amount,
                                    price:price,
                                    currency:currency,
                                    date:today,
                                    time:time,
                                    fullname:first_name+ " "+middle_name+" "+last_name,
                                    email:email,
                                    quantity:quantity,
                                    status:'Complete'
                                }]),
                            };
                            let query = {
                               _id:mongojs.ObjectId(subscriber._id)
                            }
                        
                            Subscriber.update(query,{$set:data},()=>{
                                res.send({success:true})
                            })
                        }
                        else
                        {
                            
                            let data = {
                                subscriber_id:subscriber_random,
                                email:email,
                                status:"Active",
                                quantity:quantity,
                                product:product,
                                subscription_plan:plan,
                                last_payment:[
                                    {
                                        currency:currency,
                                        amount:amount,
                                        quantity:quantity,
                                        date:today,
                                        time:time,
                                        license:license
                                    }
                                ],
                                next_payment:[
                                    {
                                        currency:FilterCurrencies[0].currency,
                                        amount:FilterCurrencies[0].amount,
                                        expiry_date:expiry_date,
                                        quantity:quantity
                                    }
                                ],
                               
                                order:[{
                                    order_no:order_random,
                                    amount:amount,
                                    price:price,
                                    currency:currency,
                                    date:today,
                                    time:time,
                                    fullname:first_name+ " "+middle_name+" "+last_name,
                                    email:email,
                                    quantity:quantity,
                                    status:'Complete'
                                }],
                                added_on:today,
                            };
                            Subscriber.save(data,(err)=>{
                                subscription_created(user.db_name,data)
                                res.send({success:true})
                            })
                        }
                    })
                }

                
            }
            else
            {
              res.send({success:false})
            }
        })

        
    },3000)

        
        

    })
}
module.exports = {
    pay_now:pay_now
}