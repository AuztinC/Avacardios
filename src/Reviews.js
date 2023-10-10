import React, {useState} from 'react'
import axios from 'axios'

const ReviewForm=({reviews,setReviews,products})=>{
    const [product,setProduct]=useState('');
    const [star,setStar]=useState('');
    const [review,setReview]=useState('');
    
    const save=async(ev)=>{
        ev.preventDefault();
        const {data}=await axios.post('/api/reviews',{product_id:product,stars:star,body:review});
        setReviews(...reviews,data[0]);
    }
    
    return(
        <form onSubmit={save}>
            <h4>Enter a new review here!</h4>
            <select value={product} onChange={ev=>setProduct(ev.target.value)}>
                <option value=''>Select a Product</option>
                {
                    products.map((prod)=>{
                        <option key={prod.id} value={prod.id}>{prod.name}</option>
                    })
                }
            </select><br/>
            <label>Stars (1-5):<input type='number' onChange={ev=>setStar(ev.target.value)}></input></label><br/> 
            <label>Review:<input type='text' onChange={ev=>setReview(ev.target.value)}></input></label><br/>
            <button type='submit' disabled={!product||!star||!review}>Post Review</button>
        </form>
    )
}

const Reviews=({reviews,setReviews,products})=>{
    return(
        <>
            <h1>Reviews</h1>
            <hr/>
            {
                products.map((prod)=>{
                     const RevItUp=()=>{
                         return(
                             <>
                                <ul>
                                {
                                    reviews.map((rev)=>{
                                        if(prod.id===rev.product_id){
                                            return <li key={rev.id}>{rev.stars} - {rev.body}</li>
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
            <ReviewForm reviews={reviews} setReviews={setReviews} products={products}/>
            <hr/>
        </>
    )
}

export default Reviews;