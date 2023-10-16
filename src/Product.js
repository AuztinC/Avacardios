import React, {useEffect} from "react";
import {useParams,Link} from "react-router-dom";
import Reviews from "./Reviews";
import WishList from "./WishList";

const Product =({products,reviews,createReviews,cartItems,updateLineItem,createLineItem,addWishList,removeWishList,wishLists,auth})=>{
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
            <div className="product">
                <h2>{product.name}</h2>
                
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                
                {
                    auth.id ? <WishList product = { product } wishList = {wishLists.find(wish => wish.product_id === product.id)} addWishList= {addWishList} removeWishList={removeWishList} />: null
                }
                <img src={product.image}/>
                <h4>${product.price}</h4>
                <br/>
                <h4>{product.description}</h4>
                <hr/>
                <Reviews reviews={reviews} product={product} createReviews={createReviews} auth={auth}/>
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                }
            </div>
        );
    }
}

export default Product;