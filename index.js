const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userrouter = require('./routes/User');
const authrouter = require('./routes/auth');
const productsrouter = require('./routes/Product');
const cartrouter = require('./routes/Cart');
const ordersrouter = require('./routes/Order');
const paymentrouter = require('./routes/stripe');

const colors = require('colors');

const dotenv = require('dotenv');
dotenv.config();

// to handle json files
app.use(cors());  
app.use(express.json());

app.use('/api/users', userrouter);
app.use('/api/auth', authrouter);
app.use('/api/products', productsrouter);
app.use('/api/orders', ordersrouter);
app.use('/api/carts', cartrouter);
app.use('/api/checkout', paymentrouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log('DB connected Succsfully');
    console.log(
      ` server is listening on ${PORT},database connected `.white.bold.inverse
    );
  } catch (err) {
    console.log(' some thing went wrong'.green.inverse, err);
  }
});
