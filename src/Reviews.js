import React, {useState} from 'react'
import axios from 'axios'

const ReviewForm=()=>{
    const [product,setProduct]=useState('');
    const [stars,setStars]=useState('');
    const [review,setReview]=useState('');
    
    return(
        <form>
            <h4>Enter a new review here!</h4>

        </form>
    )
}

const Reviews=()=>{
    return(
        <>
            <h1>Reviews</h1>
            <hr/>
            <ReviewForm />
            <hr/>
        </>
    )
}

export default Reviews;