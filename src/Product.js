import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Reviews from "./Reviews";

const Product =({products,reviews,createReviews,cartItems,updateLineItem,createLineItem,auth})=>{
    const {id}=useParams();

    let product=products.find((prod)=>{
        return prod.id===id
    });

    const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);

    useEffect(()=>{
        product=products.find((prod)=>{
            return prod.id===id}); 
    },[products]);

    if(!product){
        return <h2>Loading...</h2>
    }else{
        return(
            <div className="products">
                <h2>{product.name}</h2>
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }<br/>
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