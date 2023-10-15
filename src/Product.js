import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Reviews from "./Reviews";

const Product =({products,reviews,createReviews,auth})=>{
    const {id}=useParams();

    let product=products.find((prod)=>{
        return prod.id===id
    });

    useEffect(()=>{
        product=products.find((prod)=>{
            return prod.id===id}); 
    },[products]);

    if(!product){
        return <h2>Loading...</h2>
    }else{
        return(
            <div className="product">
                <h2>{product.name}</h2>
                <img src={product.image}/>
                <h4>${product.price}</h4>
                <h4>{product.description}</h4>
                <hr/>
                <Reviews reviews={reviews} product={product} createReviews={createReviews} auth={auth}/>
            </div>
        );
    }
}

export default Product;