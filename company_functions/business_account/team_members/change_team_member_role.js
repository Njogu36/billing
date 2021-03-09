const mongojs = require("mongojs");
const db = mongojs("mongodb://localhost/main_db_");
const User = db.collection("users");
const change_team_member_role = (req, res) => {
  let { id, role } = req.body;
  let query = {
    _id: mongojs.ObjectId(id),
  };
  let data = {};
  data.role = role;
  User.update(query, { $set: data }, (err) => {
    req.flash("info", "User updated successfully.");
    res.redirect("/company/team_members");
  });
};
module.exports = {
  change_team_member_role: change_team_member_role,
};
