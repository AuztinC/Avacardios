const {
    fetchAddress,
    createAddress
  } = require('../db/shipping');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');

  app.get('/', isLoggedIn, async(req,res,next)=>{
    try {
        res.send(await fetchAddress(req.user.id));
    } catch (error) {
        next(error);
    }
})

app.post('/', isLoggedIn, async(req,res,next)=>{
    try {
        res.send(await createAddress({user_id: req.user.id}))
    } catch (error) {
        next(error);
    }
})

module.exports=app;