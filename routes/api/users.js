const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../../config/keys");
const passport = require("passport");

// Validation(s)
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// User model
const User = require("../../models/User");

// @route  POST api/users/register
// @desc   Register new user
// @access Public
router.post("/register", (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if user exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      console.log(user);
      errors.email = "Létezik már felhasználó a megadott E-mail címmel!";
      return res.status(400).json(errors);
    }
    // User object from request body
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Hashing password, then save user
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route  POST api/users/login
// @desc   Login user
// @access Public
router.post("/login", (req, res) => {
  const { isValid, errors } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Check if user exists
  User.findOne({ email }).then(user => {
    //
    if (!user) {
      errors.email = "A megadott E-mail címmel felhasználó nem létezik!";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const jwtPayload = {
          id: user.id,
          name: user.name
        };

        jwt.sign(jwtPayload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      } else {
        errors.password = "Téves jelszó";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route  POST api/users/current
// @desc   Get current user data
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
