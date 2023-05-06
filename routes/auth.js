const router = require('express').Router();
const User = require('../model/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// REGISTE
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // if any empty field is found through error
    if (!email || !password || !username) {
      return res.status(422).json({ message: 'Please fill required data' });
    }

    const user = await User.findOne({ username: req.body.email });
    if (user) {
      return res.status(402).json({ message: 'user alreday exist' });
    } else {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.CRYPTO_PASSWD
        ).toString(),
      });
      res.status(201).json({
        message: 'Success',
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.json_sec_key,
      { expiresIn: '2d' }
    );
    if (!user) {
      return res.status(401).json({ message: 'user does not exist' });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_PASSWD
    );
    const origibalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (origibalPassword !== req.body.password) {
      return res.status(401).json({ message: 'wrong password' });
    } else {
      const { password, ...others } = user._doc;
      return res.status(200).json({ ...others, accessToken });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
``;
