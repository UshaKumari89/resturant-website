
const express = require('express');
const router = express.Router();
const user = require('../models/Users');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library

const bcrypt = require('bcryptjs');
const jwtsecret = "mySecretKey123";

// Validation middleware
const validateUserInfo = [
  body('password', 'incorrect Password').isLength({ min: 5 }),
  body('name').isLength({ min: 4 }),
  body('email', 'invalid Email').isEmail()
];

//create a new user
router.post('/createuser', validateUserInfo, async (req, res) => {
  //console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  let securePassword = await bcrypt.hash(req.body.password, salt);
  try {
    await user.create({
      name: req.body.name,
      password: securePassword,
      email: req.body.email,
      number: req.body.number
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

// Route for user login
const validateInfo = [
  body('password', 'incorrect Password').isLength({ min: 5 }),
  body('email', 'invalid Email').isEmail()
];

router.post('/login', validateInfo, async (req, res) => {
  const { email, password } = req.body;
  //console.log('Received credentials:', { email, password });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ success: false, message: 'Invalid email' });
    }

    const pwdComapre = await bcrypt.compare(password, existingUser.password); // Using 'password' directly instead of req.body.password

    if (pwdComapre) {
      const data = {
        user: {
          id: existingUser.id
        }
      };
      const authToken = jwt.sign(data, jwtsecret); // Generating the authentication token
      return res.status(200).json({ success: true, message: 'Login successful', authToken }); // Sending the token in the response
    } else {
      return res.status(401).json({ success: false, message: 'Password is not correct!!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
