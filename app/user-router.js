const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../app/models/user");
const fs = require("fs");
const axios = require('axios');


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();
  // if they aren't redirect them to the home page
  res.redirect("/");
}


// HOME PAGE (with login links)
router.get("/", function(req, res) {
  res.render("index.ejs", { user: req.user }); // load the index.ejs file
});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// show the login form
router.get("/login", function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render("login.ejs", {
    message: req.flash("loginMessage"),
    user: req.user
  });
});

// process the login form
router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/menu", // redirect to the secure profile section
    failureRedirect: "/login", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);

// show the signup form
router.get("/signup", function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render("signup.ejs", {
    message: req.flash("signupMessage"),
    user: req.user
  });
});

// process the signup form
router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/menu", // redirect to the secure profile section
    failureRedirect: "/signup", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);

// show the apple-app-site-association file
router.get("/apple-app-site-association", function(req, res) {
  // render the page and pass in any flash data if it exists
  fs.readFile('views/apple-app-site-association', 'utf8', (err, text) => {
    res.end(text);
  })
  
});
// show the test file
router.get("/test.json", function(req, res) {
  // render the page and pass in any flash data if it exists
  fs.readFile('views/test.json', 'utf8', (err, text) => {
    res.end(text);
  })
  
});

router.get("/preferences", function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render("preferences.ejs", {
    message: req.flash("preference-center"),
  
  });
});
router.get("/publicmenu", function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render("publicmenu.ejs", {
    message: req.flash("public-menu"),
  
  });
});
router.get("/feed", function(req, res) {
  console.log('ok1')
  // render the page and pass in any flash data if it exists
  axios.get('https://www.dailycamera.com/wp-json/wp/v2/posts?categories=31&per_page=10')
  .then(response => {
    console.log(response.data[0]);
    var feed = {data: response.data[0]}
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(feed));
  })
  .catch(error => {
    console.log(error);
  });
  })
  
router.get("/publicmenu/coffee", function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render("publicmenu.ejs", {
    message: req.flash("public-menu"),
  
  });
});
router.get("/publicmenu/cappuccino", function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render("publicmenu.ejs", {
    message: req.flash("public-menu"),
  
  });
});
router.get("/publicmenu/latte", function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render("publicmenu.ejs", {
    message: req.flash("public-menu"),
  
  });
});
router.get("/publicmenu/mocha", function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render("publicmenu.ejs", {
    message: req.flash("public-menu"),
  
  });
});

// LOGOUT ==============================
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
