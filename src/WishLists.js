import React from "react";

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
       <div>
            <h2>Wish List</h2>
            {
                wishLists.map((wish) => {
                    const product = products.find(product => product.id === wish.product_id);
                    return (
                        <div key={wish.id}>
                            <h4>{product.name}</h4>
                            <DeleteWishList product= { product } wishList = {wishLists.find(wish => wish.product_id === product.id)} removeWishList= { removeWishList } />
                        </div>
                       
                      
                    )
                })
            }
       </div>
    )
}

export default WishLists;