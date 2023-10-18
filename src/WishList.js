import React from "react";

const WishList = ({product, wishList, addWishList, removeWishList}) => {
    return (
      <>
        {
          wishList ? <button onClick={() => removeWishList(wishList)}>Remove from Wish List</button> : 
          <button onClick={() => addWishList({product_id: product.id})}>Add to Wish List</button>
        }
      </>
    )
}

export default WishList;