import React from "react";
import { Link } from "react-router-dom";

const DeleteWishList = ({product, wishList, addWishList, removeWishList}) => {
    return (
      <div>
        {
          wishList ? <button onClick={() => removeWishList(wishList)}>Remove from Wish List</button>: null
        }
      </div>
    )
  }

const WishLists = ({products, wishLists, removeWishList, auth}) => {
    if(!wishLists){
        return null
      }
    return (
       <div className="wishlists">
        { wishLists.length === 0 ? <>
        <h2>Add some products to your WishList!</h2>
        <Link style={{textDecoration: 'underline'}} to='/products'>All Products -{">"}</Link>
        </> : <>
            <h2>Your Wish List</h2>
            {
              wishLists.map((wish) => {
                const product = products.find(product => product.id === wish.product_id);
                return (
                  <div key={wish.id}>
                      <h4><Link to={`/products:${product.id}`}>{product.name}</Link></h4>
                      <img src={product.image} />
                      <div><Link to={`/products:${product.id}`}>Product Page</Link></div>
                      <DeleteWishList product= { product } wishList = {wishLists.find(wish => wish.product_id === product.id)} removeWishList= { removeWishList } />
                  </div>
                )
              })
            }
          </>}
       </div>
    )
}

export default WishLists;