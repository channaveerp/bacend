const Cart = require('../model/Cart');
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require('./verifyToken');

const router = require('express').Router();

// CREATE PRODUCT
router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    // TO UPATED USER
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE Cart

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Cart is deleted..' });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Cart

router.get('/find/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    return res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET ALL CARTS

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
