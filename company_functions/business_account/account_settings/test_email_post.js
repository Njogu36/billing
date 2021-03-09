const nodemailer = require('nodemailer');
const mongojs = require('mongojs')

const test_email_post = (req,res)=>{
    const {test_email}= req.body;
  const db_name = req.user.db_name;
  const db = mongojs("mongodb://localhost/"+db_name)
  const Email = db.collection("emails");
  Email.findOne({},(err,email)=>{
      const to = test_email;
      const from = email.email;
      const pass = email.pass;
      const host = email.host;

                       let subject = 'TEST EMAIL'
                       let message = 'SUCCESS'
                       
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
                              
                            req.flash('danger',error.response);
                            res.redirect('/company/account_settings')
                          }
                          else
                          {
                              req.flash('info','Email send successfully.');
                              res.redirect('/company/account_settings')
                          }
                      })

  })
}
module.exports = {
    test_email_post:test_email_post
}