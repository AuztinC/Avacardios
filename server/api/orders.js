const {
  fetchOrders,
  fetchAllOrders,
  updateOrder,
  fetchWishList,
  createWishList,
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.put('/:id', isLoggedIn, async(req, res, next)=> {
  try {
    const { is_cart, shipping_id } = req.body;
    res.send(await updateOrder({ is_cart, shipping_id, id: req.params.id}));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchOrders(req.user));
  }
  catch(ex){
    next(ex);
  }
});
app.get('/allOrders', async(req, res, next)=> {
  try {
    res.send(await fetchAllOrders());
  }
  catch(ex){
    next(ex);
  }
});



module.exports = app;
