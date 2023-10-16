const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.use(express.json({limit: "200mb"}));


app.use('/products', require('./products'));
app.use('/', require('./auth'));
app.use('/orders', require('./orders'));
app.use('/lineItems', require('./lineItems'));
app.use('/wishList', require('./wishList'))
app.use('/reviews', require('./reviews'));
app.use('/shipping', require('./shipping'));

module.exports = app;
