import React from 'react';
import { Link } from 'react-router-dom';

const WishList = ({product, wishList, addWishList, removeWishList}) => {
  return (
    <div>
      {
        wishList ? <button onClick={() => removeWishList(wishList)}>Remove from Wish List</button>: <button onClick={() => addWishList({product_id: product.id})}>Add to Wish List</button>
      }
    </div>
  )
}

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, wishLists, addWishList, removeWishList})=> {

  if(!products){
    return null
  }
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {
          products.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id }>
                { product.name }
                <div>
                  <p>${product.price.toFixed(2)}</p>
                  <p>{product.description}</p>
                </div>
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                }
                {
                  auth.id ? <WishList product = { product } wishList = {wishLists.find(wish => wish.product_id === product.id)} addWishList= {addWishList} removeWishList= { removeWishList }/>: null
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
