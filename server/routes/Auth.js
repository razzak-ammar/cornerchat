const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const private = require('../middleware/private');
const bcrypt = require('bcrypt');

// @method      GET api/auth
// @desc        Check current auth
// @access      Private
router.get('/', private, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @method      POST api/auth
// @desc        Login a user & get a token
// @access      Public
router.post(
  '/',
  check('email', 'An email address is required').isEmail(),
  check('password', 'A password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            success: true,
            message: `User ${email} authenticated successfully`,
            data: { token }
          });
        }
      );
    } catch {
      console.log(err);
      res.status(500).send('Server error');
    }
  }
);

// @method      POST api/auth/register
// @desc        Register a user
// @access      Public
router.post(
  '/register',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is invalid')
    .isLength({ min: 8, max: 50 })
    .exists(),
  check('name', 'A name is required').exists(),
  check('username', 'A username is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { email, password, name, username } = req.body;

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ success: false, errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        email,
        password,
        name,
        username
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            success: true,
            message: `User account ${email} created successfully`,
            data: { email, token }
          });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
