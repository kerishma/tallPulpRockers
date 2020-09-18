// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
<<<<<<< HEAD
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
=======
// const { like } = require("sequelize/types/lib/operators");
>>>>>>> 7b512872a48f50b9c7af7ce092ad9ece22a37681

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
     
      res.json({});
      console.log(req.user)
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

   app.get("/api/search?", function(req, res){
     console.log("oranges", req.query)
     db.Pose.findAll({
       where: {
  //       pose_name: {[like]:"%" + req.query.keyword + "%"},
         difficulty: req.query.difficulty
       }
     }).then((results) => {
       const dbPoses = results.map(pose => pose.dataValues);
       console.log(dbPoses)
       res.render('search', {pose: dbPoses})
     })
   })
};
