import React, {useState} from 'react'

const ReviewForm=({product,createReviews,auth})=>{
    const [star,setStar]=useState('');
    const [review,setReview]=useState('');

    const save=async(ev)=>{
        ev.preventDefault();
        setStar('');
        document.getElementById('revv').value='';
        createReviews({username:auth.username,product_id:product.id,stars:star,body:review});
    }

    return(
        <form onSubmit={save}>
            <h4>Enter a new review here!</h4>
            <span>
            <label>Stars (1-5): {star}</label>
            <button type='button' className='star' onClick={()=>increaseRating(star,setStar)}>+</button>
            <button type='button' className='star' onClick={()=>decreaseRating(star,setStar)}>-</button>
            </span>
            <label>Review:<input id='revv' type='text' onChange={ev=>setReview(ev.target.value)}></input></label>
            <button type='submit' disabled={!product||!star||!review}>Post Review</button>
        </form>
    )
}

const increaseRating=(star,setStar)=>{ 
    if(star*1<5){
        setStar((star*1)+1);
    }
}

const decreaseRating=(star,setStar)=>{
    if(star===''){
        setStar(1);
    }
    if(star*1>1){
        setStar((star*1)-1);
    }
}

const Reviews=({reviews,product,createReviews,auth})=>{
    return(
        <>
            <h4>Reviews</h4>
            <ul>
            {
                reviews.map((rev)=>{
                    if(product.id===rev.product_id){
                        return <li key={rev.id}>{rev.username?rev.username:'Guest'}: {rev.stars} - {rev.body}</li>
                    }
                })
             }
            </ul>
            <hr/>
            <ReviewForm product={product} createReviews={createReviews} auth={auth}/>
            <hr/>
        </>
    )
}

export default Reviews;