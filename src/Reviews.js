import React, {useState} from 'react'

const ReviewForm=({products,createReviews,auth})=>{
    const [product,setProduct]=useState('');
    const [star,setStar]=useState('');
    const [review,setReview]=useState('');

    const save=async(ev)=>{
        ev.preventDefault();
        setProduct('');
        setStar('');
        document.getElementById('revv').value='';
        createReviews({username:auth.username,product_id:product,stars:star,body:review});
    }

    return(
        <form onSubmit={save}>
            <h4>Enter a new review here!</h4>
            <select value={product} onChange={ev=>setProduct(ev.target.value)}>
                <option key='' value=''>Select a Product</option>
                {
                    products.map((prod)=>{
                        return <option key={prod.id} value={prod.id}>{prod.name}</option>
                    })
                }
            </select><br/>
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

const Reviews=({reviews,setReviews,products,createReviews,auth})=>{
    return(
        <>
            <h1>Reviews</h1>
            <hr/>
            {
                products.map((prod)=>{
                     const RevItUp=()=>{
                        if(!prod){
                            return null;
                        }
                         return(
                             <>
                                <ul>
                                {
                                    reviews.map((rev)=>{
                                        if(prod.id===rev.product_id){
                                            return <li key={rev.id}>{rev.username?rev.username:'Guest'}:{rev.stars} - {rev.body}</li>
                                        }
                                    })
                                 }
                                </ul>
                             </>
                         )
                     }
                     return(
                         <>
                             <h4 key={prod.id}>{prod.name}</h4>
                             <RevItUp />
                         </>
                     )
                })
             }
            <hr/>
            <ReviewForm reviews={reviews} setReviews={setReviews} products={products} createReviews={createReviews} auth={auth}/>
            <hr/>
        </>
    )
}

export default Reviews;