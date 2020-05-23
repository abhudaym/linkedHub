const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

// @route GET api/auth
// @desc  Test route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Message');
  }
});

// @route    POST api/auth
// @desc     Authenticate user and get token
// @access   Public
router.post(
  '/',
  // Perform validation using express-validator
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if a user exists
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          errors: 'Invalid Credentials',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: 'Invalid Credentials' });
      }

      // Return jwt for logging in
      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), (error, token) => {
        if (error) throw error;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
