const {
    fetchAddress,
    createAddress
  } = require('../db/shipping');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');

  app.get('/',async(req,res,next)=>{
    try {
        res.send(await fetchAddress());
    } catch (error) {
        next(error);
    }
})

app.post('/', isLoggedIn, async(req,res,next)=>{
    try {
        res.send(await createAddress(req.body))
    } catch (error) {
        next(error);
    }
})

module.exports=app;