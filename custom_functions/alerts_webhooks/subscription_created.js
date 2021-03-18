const mongojs = require('mongojs')
const fetch = require('node-fetch');
const nodemailer =require('nodemailer')
const subscription_created = (db_name,data)=>{
    const db = mongojs("mongodb://localhost/"+db_name);
    const ALERTWEBHOOK = db.collection("alertwebhooks");
    const Email = db.collection("emails");
    ALERTWEBHOOK.findOne({},(err,response)=>{
        if(response)
        {
            if(response.email !=='')
            {
                const Filter = response.subscription_created.filter((x)=>{
                    return x === 'Email'
                })
                if(Filter.length > 0)
                {

                Email.findOne({},(err,email)=>{
                    const to = data.email;
                    const from = email.email;
                    const pass = email.pass;
                    const host = email.host;
              
                                     let subject = 'NEW SUBSCRIBER CREATED'
                                     let message = 'Hi, a new subscriber has been created.\n Email: '+data.email+'\n Product Name: '+data.product.product_name+'\n Plan: '+data.subscription_plan.plan_name+'\n Date: '+data.added_on
                                     
                                     var transporter
                                     if(host ==="smtp-mail.outlook.com")
                                     {
                                       transporter = nodemailer.createTransport({
                                          host: host,
                                          secureConnection: false, 
                                          port: 587,
                                          tls: {
                                             ciphers:'SSLv3'
                                          },
                                          auth: {
                                              user: from,
                                              pass: pass
                                          }
                                      });
                                     }
                                     if(host ==="smtp.zoho.com")
                                     {
                                       transporter = nodemailer.createTransport({
                                          host: host,
                                          port: 465,
                                          secure: true, // use SSL
                                          auth: {
                                              user:from,
                                              pass: pass
                                          }
                                      });
                                     }
                                     if(host ==='smtp.gmail.com')
                                     {
                                       transporter = nodemailer.createTransport({
                                          host: host,
                                          port: 465,
                                          secure: true, // use SSL
                                          auth: {
                                              user: from,
                                              pass: pass
                                          }
                                      });
                                     }
                                    
                                     
                                
                                    var mailOptions = {
                                        from:from,
                                        to: to,
                                        subject: subject,
                                        text:message
                                    };
                                
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if(error)
                                        {
                                            
                                          return error
                                        }
                                        else
                                        {
                                            return "EMAIL SENT"
                                        }
                                    })
                })
            
           
           
         } }
            if(response.webhook !=='')
            {
                const Filter = response.subscription_created.filter((x)=>{
                    return x === 'Webhook'
                })
                if(Filter.length>0)
                {
                    const url = response.webhook;
                    const options = {
                        method:'POST',
                        headers:{
                            "Accept":"application/json",
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(data)
                    }
                    fetch(url,options)
                    .then(res => res.text())
                    .then((res)=>{
                           return "WEBHOOK SENT"
                    }).catch((err)=>{
                        return err
                    })
                }
               
            }
        }
    })
}
module.exports = subscription_created