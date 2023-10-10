import React from "react";

const WishLists = ({products, wishLists}) => {
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
                            <li>{product.name}</li>
                        </div>
                    )
                })
            }
       </div>
    )
}

export default WishLists;