// LIBRARY
const mongojs = require('mongojs');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const db = mongojs('mongodb://localhost/main_db_')


const add_new_company =(req,res)=>{
    const { first_name, last_name, email, company_name, country } = req.body;
    db.users.findOne({username:email,type:{$in:['Company','Administrator']}},(err,user)=>{
        if(user)
        {
           req.flash('danger','User already exists.')
           res.redirect('/administrator/')
        }
        else
        {
          
                       // EMAIL
                       const db_name = company_name.split(" ")[0]
                       const random_val = Math.floor(100000 + Math.random() * 900000)
                       const password = "!_."+random_val
                       let to = email;
                       let subject = 'WELCOME TO THE BILLING SYSTEM'
                       let message = 'Hi '+first_name + ', Please visit this link to login to your account.\nWebsite Link: '+process.env.URL+'\nUsername: '+email+'\nPassword: '+password;
                       
                       var transporter = nodemailer.createTransport({
                          host: "smtp-mail.outlook.com",
                          secureConnection: false, 
                          port: 587,
                          tls: {
                             ciphers:'SSLv3'
                          },
                          auth: {
                              user: 'support@centum.co.ke',
                              pass: 'c@sp3rVault!@'
                          }
                      });
                  
                      var mailOptions = {
                          from:'support@centum.co.ke',
                          to: to,
                          subject: subject,
                          text:message
                      };
                  
                      transporter.sendMail(mailOptions, function (error, info) {
                          if (error) {
                            req.flash('info','Something went wrong. Email was not sent. Please verify the email address or try again later.')
                            res.redirect('/administrator/')
                          } else {
                            let data = {}
                            data.first_name = first_name
                            data.last_name = last_name
                            data.username = email
                            data.company_name = company_name
                            data.company_icon = '/assets/images/company.png'
                            data.enabled = true
                            data.status = "Main"
                            data.vendor_id = random_val
                            data.country = country
                            data.role ='Administrator'
                            data.type ='Company'
                            data.db_name = db_name+'_db'
                            data.password = password
                            bcrypt.genSalt(10, function (err, salt) {
                                bcrypt.hash(password, salt, function (err, hash) {
                                    data.password = hash
                                    db.users.save(data,()=>{
                                        req.flash('info','User saved successfully.')
                                        res.redirect('/administrator/')
                                    })
                                })
                            })
                          }
                      });                 
        }
    })
}

module.exports = {
   add_new_company:add_new_company
}