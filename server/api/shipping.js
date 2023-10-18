const {
    fetchAddress,
    createAddress,
    deleteAddress
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
        res.send(await createAddress({user_id: req.user.id, ...req.body}))
    } catch (error) {
        next(error);
    }
})

app.delete('/:id', isLoggedIn, async(req, res, next)=> {
    try {
      await deleteAddress({ id: req.params.id, user_id: req.user.id });
      res.sendStatus(204);
    }
    catch(ex){
      next(ex);
    }
  });

module.exports=app;