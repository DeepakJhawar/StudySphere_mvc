var express = require('express');
const { route } = require('./admin');
const passport = require("passport");
const { Strategy } = require("passport-local");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oidc");
const generateSecureOTP = require("./utils/generateOTP.js");
const Mail = require("./utils/mail.js");
const bcrypt = require("bcrypt");
const collection = require("../models/userModel.js");

var router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

Mail.init();

router.get("/", (req, res) => {
  res.render("landing");
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) res.redirect("/dashboard");
  else res.render("login", { messages: req.flash("error") });
});

router.get("/signup", (req, res) => {
  res.render("signup", { message: null });
});

router.get("/verify-otp", (req, res) => {
  res.render("verifyOTP", { message: null });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/StudySphere",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.post("/signup", async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      name: req.body.username,
      password: req.body.password,
    };

    const existingUser = await collection.findOne({ email: data.email });
    if (existingUser) {
      return res.redirect("/login");
    }
    const checkUserName = await collection.findOne({ name: data.name });
    if (checkUserName) {
      return res.render("signup", {
        message: "Username taken. Try another name. ",
      });
    }
    const otp = generateSecureOTP();
    Mail.sendOTPByEmail(data.email, otp);

    req.session.signupData = {
      email: data.email,
      otp: otp,
      name: data.name,
      password: data.password,
    };

    res.redirect("/verify-otp");
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.render("signup", {
      message: "Error sending OTP. Please try again later.",
    });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, name, password } = req.session.signupData;
    const { enteredOTP } = req.body;
    if (otp === enteredOTP) {
      const data = {
        email: email,
        name: name,
        password: password,
      };
      delete req.session.signupData;
      const saltrounds = 10;
      const hashPassword = await bcrypt.hash(data.password, saltrounds);
      data.password = hashPassword;

      const user = await collection.create(data);
      console.log("User created successfully");
      req.login(user, (err) => {
        if (err) {
          console.error("Error logging in:", err);
          return res.render("signup", {
            message: "Error logging in. Please try again later.",
          });
        }
        res.redirect("/dashboard");
      });
    } else {
      res.render("verifyOTP", { message: "Invalid OTP. Please try again." });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.render("verify-otp", {
      message: "Error verifying OTP. Please try again later.",
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
});


passport.use(
  "local",
  new Strategy(async function (username, password, cb) {
    try {
      const user = await collection.findOne({ name: username });
      if (!user) {
        return cb(null, false, { message: "User not found!" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return cb(err);
        } else {
          if (result) {
            return cb(null, user);
          } else {
            return cb(null, false, {
              message: "Invalid UserName or Password!",
            });
          }
        }
      });
    } catch (error) {
      return cb(error);
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/StudySphere",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (issuer, profile, cb) => {
      try {
        const user = await collection.findOne({
          email: profile.emails[0].value,
        });
        if (!user) {
          const newUser = collection.create({
            email: profile.emails[0].value,
            name: profile.displayName,
            password: "google",
          });
          cb(null, newUser);
        } else {
          cb(null, user);
        }
      } catch (err) {
        cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  if (user instanceof Promise) {
    user.then((user) => {
      cb(null, user.id);
    });
  } else {
    cb(null, user.id);
  }
});

passport.deserializeUser((id, done) => {
  collection
    .findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

module.exports = router;
