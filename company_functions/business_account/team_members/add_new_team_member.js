const mongojs = require("mongojs");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const db = mongojs("mongodb://localhost/main_db_");
const User = db.collection("users");
const add_new_team_member = (req, res) => {
  const { first_name, last_name, email, role } = req.body;
  const random_val = Math.floor(100000 + Math.random() * 900000);
  const password = "!_." + random_val;
  let to = email;
  let subject = "WELCOME TO THE BILLING SYSTEM";
  let message =
    "Hi " +
    first_name +
    ", Please visit this link to login to your account.\nWebsite Link: " +
    process.env.URL +
    "\nUsername: " +
    email +
    "\nPassword: " +
    password;

  var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: "support@centum.co.ke",
      pass: "c@sp3rVault!@",
    },
  });

  var mailOptions = {
    from: "support@centum.co.ke",
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      req.flash(
        "info",
        "Something went wrong. Email was not sent. Please verify the email address or try again later."
      );
      res.redirect("/company/team_members");
    } else {
      let data = {};
      data.first_name = first_name;
      data.last_name = last_name;
      data.username = email;
      data.company_name = req.user.company_name;
      data.company_icon = req.user.company_icon;
      data.enabled = true;
      data.country = req.user.country;
      data.type = "Company";
      data.role = role;
      data.status = '...'
      data.db_name = req.user.db_name;
      data.password = password;
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          data.password = hash;
          User.save(data, () => {
            req.flash("info", "User saved successfully.");
            res.redirect("/company/team_members");
          });
        });
      });
    }
  });
};
module.exports = {
  add_new_team_member: add_new_team_member,
};
