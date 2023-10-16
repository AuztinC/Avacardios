const {
  fetchProducts,
  createProduct,
  updateProduct
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

app.put('/:id', isLoggedIn, isAdmin, async(req, res, next)=> {
  try {
    const response = await updateProduct(req.body)
    res.send(response);
  } catch (error) {
    next(error)
  }
});

app.post('/', isLoggedIn, isAdmin, async(req, res, next)=>{
  try {
    res.send( await createProduct(req.body))
  } catch (error) {
    next(error)
  }
})


module.exports = app;
