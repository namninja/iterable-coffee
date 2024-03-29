const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const User = require("./models/user");
const Coffee = require("./models/coffee");
var jwt = require('jsonwebtoken');
const { SECRET } = require("../config/database.js");


function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();
  // if they aren't redirect them to the home page
  res.redirect("/");
}

// Dashboard SECTION =====================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get("/home", isLoggedIn, function(req, res) {
  Coffee.find({ user: req.user.id }, function(err, coffee) {
    if (err) {
      res.status(500).send(err);
    } else {
      var token = jwt.sign({
        exp: 1711490697,
        iat: 1679954697, 
        email: req.user.email
        
        //exp: Math.floor(Date.now() / 1000) + 31536000
        
    }, "8bc52bc88ed097d4bbe28e54d58a35b7fe1d4531a9d1c2273fa0302a5e903674470364107cf878d80984d919d38814f0f0b0e6e04709858213ff8cfd6af0c0f9");
      console.log(token)
      console.log(req.user)
      res.render("home.ejs", {
        user: req.user,
        coffee: coffee,
        token: token,
        email: req.user.email

        // get the user out of session and pass to template
      });
    }
  });
});

router.get("/order", isLoggedIn, function(req, res) {
  Coffee.find({ user: req.user.id }, function(err, coffee) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render("order.ejs", {
        user: req.user,
        coffee: coffee

        // get the user out of session and pass to template
      });
    }
  });
});
router.get("/checkout", isLoggedIn, function(req, res) {
  Coffee.find({ user: req.user.id }, function(err, coffee) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render("checkout.ejs", {
        user: req.user,
        coffee: coffee

        // get the user out of session and pass to template
      });
    }
  });
});
// This route posts a new journal entry to the database
router.post("/order-coffee", isLoggedIn, jsonParser, function(req, res) {
  User.findById(req.user._id)
    .then(user => {
      if (user) {
        req.body.user = req.user._id;
        Coffee.create(req.body)
          .then(res.redirect(`/order`))
          .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
          });
      } else {
        const message = "user not found";
        console.error(message);
        return res.status(400).send(message);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went horribly awry" });
    });
});
module.exports = router;
