import React from "react";
import { toast } from 'react-toastify';

const WishList = ({product, wishList, addWishList, removeWishList}) => {
  const handleAddToWishList = () => {
    addWishList({product_id: product.id});
    toast.success('Product added to Wish List!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        style: { bottom: '0', right: '0' }
    });
}

const handleRemoveFromWishList = () => {
    removeWishList(wishList);
    toast.success('Product removed from Wish List!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        style: { bottom: '0', right: '0' }
    });
}
    return (
      <>
        {
          wishList ? 
          <button onClick={handleRemoveFromWishList}>Remove from Wish List</button> : 
          <button onClick={handleAddToWishList}>Add to Wish List</button>
        }
      </>
    )
}

export default WishList;