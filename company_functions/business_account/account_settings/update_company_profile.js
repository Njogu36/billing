const mongojs = require("mongojs");
const db = mongojs("mongodb://localhost/main_db_");
const User = db.collection("users");
const update_company_profile = (req, res) => {
  const { company_name, email } = req.body;
  let query = {
    company_name: req.user.company_name,
  };
  let data = {};
  data.company_name = company_name;
  User.update(query, { $set: data }, (err) => {
    let query = {
      _id: mongojs.ObjectId(req.user.id),
    };
    let data = {};
    data.username = email;
    User.update(query, { $set: data }, () => {
      req.flash("info", "Company details updated successfully.");
      res.redirect("/company/account_settings");
    });
  });
};
module.exports = {
  update_company_profile: update_company_profile,
};
