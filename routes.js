const routes = require('express').Router();

routes.get('/userhome', (req, res) => {
  res.send('Hello World home!');
});

routes.post('/usersname', (req, res) => {
  const user = req.body;
  res.send(user);
}); 

module.exports = routes;
