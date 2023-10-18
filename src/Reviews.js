import React, {useState} from 'react'

const ReviewForm=({product,createReviews,auth})=>{
    const [star,setStar]=useState(1);
    const [review,setReview]=useState('');

    const save=async(ev)=>{
        ev.preventDefault();
        setStar(1);
        document.getElementById('revv').value='';
        createReviews({username:auth.username,product_id:product.id,stars:star,body:review});
    }

    return(
        <form onSubmit={save} className='reviews-form'>
            <h4>Enter a new review here!</h4>
            <span>
            <label>Stars (1-5): {star}</label>
            <button type='button' className='star' onClick={()=>decreaseRating(star,setStar)}>-</button>
            <button type='button' className='star' onClick={()=>increaseRating(star,setStar)}>+</button>
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
        <div>
            <h2 style={{ textAlign: 'center' }}>Reviews</h2>
            <div className='reviews'>
            {
                reviews.map((rev)=>{
                    if(product.id===rev.product_id){
                        return (
                        <div key={rev.id}>
                            <h4>{rev.username ? rev.username:'Guest'}</h4> 
                            Rating : {rev.stars} 
                            <p>- {rev.body}</p> 
                        </div>
                        )
                    }
                })
             }
            </div>
            <ReviewForm product={product} createReviews={createReviews} auth={auth}/>
        </div>
    )
}

export default Reviews;