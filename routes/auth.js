const router = require('express').Router();
const User = require('../model/User');
var CryptoJS = require('crypto-js');

// REGISTE
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_PASSWD
    ).toString(),
  });

  try {
    const savedUsers = await newUser.save();
    res.status(201).json(savedUsers);
  } catch (err) {
    res.status(500).json({ message: 'internal sever error' });
    console.log(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
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
      return res.status(200).json(others);
    }
  } catch (err) {
    res.status(500).json({ message: 'internal sever error' });
  }
});

module.exports = router;
