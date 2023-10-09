const {
    fetchReviews,
    createReview,
}=require('../db')

const express=require('express');
const app=express.Router();

app.get('/reviews',async(req,res,next)=>{
    try {
        res.send(await fetchReviews());
    } catch (error) {
        next(error);
    }
})

app.post('/reviews',async(req,res,next)=>{
    try {
        res.send(await createReview(...req.body))
    } catch (error) {
        next(error);
    }
})

module.exports=app;