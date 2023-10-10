import React, {useEffect, useState} from 'react'

const ReviewForm=({reviews,setReviews,products,createReviews,auth})=>{
    const [product,setProduct]=useState('');
    const [star,setStar]=useState('');
    const [review,setReview]=useState('');

    //console.log(createReviews());

    const save=async(ev)=>{
        ev.preventDefault();
        setProduct('');
        document.getElementById('star').value='';
        document.getElementById('revv').value='';
        createReviews({username:auth.username,product_id:product,stars:star,body:review});
        
    }
    
    useEffect(()=>{
        console.log(reviews);
    },[reviews]);

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
            <label>Stars (1-5):<input id='star' type='number' onChange={ev=>setStar(ev.target.value)}></input></label><br/> 
            <label>Review:<input id='revv' type='text' onChange={ev=>setReview(ev.target.value)}></input></label><br/>
            <button type='submit' disabled={!product||!star||!review}>Post Review</button>
        </form>
    )
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
                                            return <li key={rev.id}>{rev.username}:{rev.stars} - {rev.body}</li>
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
            {console.log(auth)}
            {auth.id?<ReviewForm reviews={reviews} setReviews={setReviews} products={products} createReviews={createReviews} auth={auth}/>:''}
            <hr/>
        </>
    )
}

export default Reviews;