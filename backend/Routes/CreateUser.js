const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisEndtoEndYoutubeChannel$#"


router.post("/createuser",
    [
        body('email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password', 'Incorrect Password').isLength({ min: 5 })
    ]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            }).then(res.json({ success: true }))

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

router.post("/loginuser",
    [
        body('email').isEmail(),
        body('password', 'Incorrect Password').exists()
    ],
    async (req, res) => {
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ success, errors: "Try logging with correct credentials" });
            }

            if (!userData.password) {
                return res.status(400).json({ success, errors: "User data password is missing" });
            }

            const pwdCompare = await bcrypt.compare(String(password), String(userData.password));
            if (!pwdCompare) {
                return res.status(400).json({ success, errors: "Try logging with existing credentials" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            success = true;
            const authToken = jwt.sign(data, jwtSecret);
            res.json({ success, authToken })


        } catch (error) {
            console.log(error)
            res.status(500).json("Server Error");
        }
    })

module.exports = router;