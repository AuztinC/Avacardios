const {
  authenticate,
  findUserByToken,
} = require('../db');
const {
  createUser
} = require('../db/auth')

const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');

app.post('/signup', async(req, res, next)=>{
  try {
    const response = await createUser(req.body)
    res.send(response)
  } catch (error) {
    next(error)
  }
})

app.post('/login', async(req, res, next)=> {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  }
  catch(ex){
    next(ex);
  }
});


app.get('/me', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user);
  } 
  catch(ex){
    next(ex);
  }
});

module.exports = app;
