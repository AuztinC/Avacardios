const {
    fetchReviews,
    createReviews,
}=require('../db/reviews')

const express=require('express');
const app=express.Router();

app.get('/',async(req,res,next)=>{
    try {
        res.send(await fetchReviews());
    } catch (error) {
        next(error);
    }
})

app.post('/',async(req,res,next)=>{
    try {
        res.send(await createReviews(req.body))
    } catch (error) {
        next(error);
    }
})

module.exports=app;