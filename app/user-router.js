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
router.get("/", function (req, res) {
  console.log("here")
  axios.post('https://jwt-generator.stg-itbl.co/generate',
    {
      exp_minutes: 15,
      email: "nam.ngo+web@iterable.com",
      jwt_secret: "482bad84f4271d482f9d4857bbd217c2031af4ff090434ae9bd517b8a75db1e37f4acd5631645293644d99c8c5a0648a9811b25f41beb68536091dad986f4f39"
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(response => {
      console.log(response.data.token);
    })
    .catch(error => {
      console.log(error);
    });
  res.render("index.ejs", { user: req.user }); // load the index.ejs file

});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// show the login form
router.get("/login", function (req, res) {
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
    successRedirect: "/home", // redirect to the secure profile section
    failureRedirect: "/login", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);

// show the signup form
router.get("/signup", function (req, res) {
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
    successRedirect: "/home", // redirect to the secure profile section
    failureRedirect: "/signup", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  })
);

// show the apple-app-site-association file
router.get("/apple-app-site-association", function (req, res) {
  // render the page and pass in any flash data if it exists
  fs.readFile('views/apple-app-site-association', 'utf8', (err, text) => {
    res.end(text);
  })

});
// show the test file
router.get("/testfeed", function (req, res) {
  // render the page and pass in any flash data if it exists
  fs.readFile('views/test.json', 'utf8', (err, text) => {
    res.end(text);
  })

});
// show the test file
router.get("/testfeed2", function (req, res) {
  // render the page and pass in any flash data if it exists
  fs.readFile('views/test2.json', 'utf8', (err, text) => {
    res.end(text);
  })

});

router.get("/preferences", function (req, res) {
  // render the page and pass in any flash data if it exists
  res.render("preferences.ejs", {
    message: req.flash("preference-center"),

  });
});
router.get("/publicmenu", function (req, res) {
  // render the page and pass in any flash data if it exists
  res.render("publicmenu.ejs", {
    message: req.flash("public-menu"),

  });
});
router.get("/feed", function (req, res) {
  console.log('ok1')
  // render the page and pass in any flash data if it exists
  axios.get('https://www.dailycamera.com/wp-json/wp/v2/posts?categories=31&per_page=10')
    .then(response => {
      console.log(response.data[0]);
      var feed = { data: response.data[0] }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(feed));
    })
    .catch(error => {
      console.log(error);
    });
})
router.get("/ovfeed", function (req, res) {
  console.log('ok1')
  var config = {
    method: 'get',
    url: 'https://api.provisionapp.io/v1/s/email-branding?partnerId=5319',
    headers: { 
      'Authorization': 'bff3432c-03a0-44df-bd95-d4c733e70336-62949846-3f93-4b0c-aff1-3dcf1b24bf0f'
    }
  };
  
  axios(config)
  .then(function (response) {
    var feed = { emailBranding: response.data }
    console.log(JSON.stringify(response.data));
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(feed));
  })
  .catch(function (error) {
    console.log(error);
  });
})
// router.get("/testcsv", function (req, res) {
//   console.log('csv1')
//   // render the page and pass in any flash data if it exists
//   var config = {
//     method: 'get',
//     url: 'https://api.iterable.com/api/export/data.csv?dataTypeName=emailSend&range=All&delimiter=%2C&startDateTime=2022-06-21%2022%3A01%3A31%20%2B00%3A00&endDateTime=2022-06-21%2022%3A02%3A31%20%2B00%3A00',
//     headers: { 
//       'api_key': '9bd5080e5b194d74bdfc98bb6b4bb5fd'
//     }
//   };
  
//   axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//     res.end(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// })

router.get("/publicmenu/coffee", function (req, res) {
  // render the page and pass in any flash data if it exists
  res.render("publicmenu.ejs", {
    message: req.flash("public-menu"),

  });
});
router.get("/publicmenu/cappuccino", function (req, res) {
  // render the page and pass in any flash data if it exists
  res.render("publicmenu.ejs", {
    message: req.flash("public-menu"),

  });
});

router.get("/publicmenu/latte", function (req, res) {
  // render the page and pass in any flash data if it exists
  res.render("publicmenu.ejs", {
    message: req.flash("public-menu"),

  });
});
router.get("/publicmenu/mocha", function (req, res) {
  // render the page and pass in any flash data if it exists
  res.render("publicmenu.ejs", {
    message: req.flash("public-menu"),

  });
});

// LOGOUT ==============================
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
