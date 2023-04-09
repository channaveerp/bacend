const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: {
      typeof: 'string',
      required: true,
      unique: true,
    },
    desc: {
      required: true,
      type: String,
    },
    img: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    size: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
