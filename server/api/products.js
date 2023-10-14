const {
  fetchProducts,
  createProduct
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/products/:id', isLoggedIn, isAdmin, (req, res, next)=> {
  res.send('hello world');
});

app.post('/', isLoggedIn, isAdmin, async(req, res, next)=>{
  try {
    res.send( await createProduct(req.body))
  } catch (error) {
    next(error)
  }
})


module.exports = app;
