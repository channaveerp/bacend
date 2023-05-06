// verify josnweb token is valid
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // sending token from frontend
  const authHeader = req.headers.token;
  console.log('authHeader:', authHeader)
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.json_sec_key, (err, user) => {
      if (err) return res.status(403).json('Token is not Valid!');
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Eror:Your not authenticated!' });
  }
};

// verify token and redirect user to next route
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Your not alowed to do this!' });
    }
  });
};

// Admin can only add products
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Your not alowed to do this!' });
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
