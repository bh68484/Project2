var authController = require("../controllers/authcontroller.js");
var path = require("path");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",

      failureRedirect: "/signup"
    })
  );

  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.get("/logout", authController.logout);

  app.get("/dashboard", authController.dashboard);
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/dashboard");
  }
  //when linking html, not handlebars
  // app.post(
  //   "/signin",
  //   passport.authenticate("local-signin", {
  //     successRedirect: "/dashboard",

  //     failureRedirect: "/signin"
  //   })
  // );

  //michael helped with this - don't delete
  app.post("/signin", passport.authenticate("local-signin"), function(
    req,
    res
  ) {
    var userInfo = req.user.dataValues;
    console.log(userInfo);
    res.render(path.join(__dirname, "../views/dashboard.hbs"), userInfo);
  });
};
