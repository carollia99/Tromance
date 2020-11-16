const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// connect to mongodb through mongoose
const mongoose = require('mongoose');
const password = 'Carol1234';
const db_uri = `mongodb+srv://carol:${password}@cluster0.8rd9p.mongodb.net/Tromance-app?retryWrites=true&w=majority`;
mongoose.connect(db_uri, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database through mongoose'))

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    console.log('searching for user...');
    // User.findOne({ "username": req.body.username }).then(user => {
    //     console.log(user);
    //     console.log("hi");
    //     if (user) {
    //         return res.status(400).json({ username: "Email already exists" });
    //     } else {
    //         const newUser = new User({
    //             username: req.body.username,
    //             password: req.body.password
    //         });
    //         // Hash password before saving in database
    //         bcrypt.genSalt(10, (err, salt) => {
    //             bcrypt.hash(newUser.password, salt, (err, hash) => {
    //                 if (err) throw err;
    //                 newUser.password = hash;
    //                 newUser
    //                     .save()
    //                     .then(user => res.json(user))
    //                     .catch(err => console.log(err));
    //             });
    //         });
    //     }
    // });
    try {
        console.log(req.body.username);
        user = await User.findOne({ 'username': req.body.username });
        console.log(user);
        if (user != null) {
          return res.status(404).json({ message: 'Email already exists' })
        }

        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });

    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    return res.status(200).json({"Success": "True"});
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const username = req.body.username;
    const password = req.body.password;
// Find user by email
    User.findOne({ username }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ usernamenotfound: "Email not found" });
        }
// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username
                };
// Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});
module.exports = router;