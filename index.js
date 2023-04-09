const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userrouter = require('./routes/User');
const authrouter = require('./routes/auth');
const dotenv = require('dotenv');
dotenv.config();

// to handle json files
app.use(express.json());

app.use('/api/users', userrouter);
app.use('/api/auth', authrouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {  
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log('DB connected Succsfully');
    console.log(`server is listening on ${PORT}`);
  } catch (err) {
    console.log('some thing went wrong', err);
  }
});
