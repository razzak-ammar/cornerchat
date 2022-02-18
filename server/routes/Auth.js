const router = require('express').Router();
const { check, validationResult } = require('express-validator');

// @method      GET
// @desc        Check current auth
// @access      Private
router.get('/', (req, res) => {
  res.send('Hello World');
});

// @method      POST
// @desc        Login a user
// @access      Public
router.get('/login', (req, res) => {
  res.send('Your logged in');
});

// @method      POST
// @desc        Register a user
// @access      Public
router.post(
  '/register',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is invalid')
    .isLength({ min: 8, max: 50 })
    .exists(),
  check('name', 'A name is required').exists(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, name } = req.body;

      res.status(200).json({
        success: true,
        message: `User account ${email} created successfully`,
        data: { email, name }
      });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
