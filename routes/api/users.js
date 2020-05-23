const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
// @route POST api/users
// @desc  Register User
// @access Public
router.post(
  '/',
  [
    check('name', 'Please enter a name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with a minimum of 8 characters'
    ).isLength({ min: 8 }),
  ],
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      return res.status(200).json({ message: `user registered` });
    }
  }
);

module.exports = router;
