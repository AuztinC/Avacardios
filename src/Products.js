import React from 'react';
import { Link } from 'react-router-dom';


const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, wishLists})=> {
  
  const WishList = ({product, wishList}) => {
    return (
      <div>
        {
          wishList ? <button>Remove from Wish List</button>: <button>Add to Wish List</button>
        }
      </div>
    )
  }


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
                  auth.id ? <WishList product = { product } wishList = {wishLists.find(wish => wish.product_id === product.id)}/>: null
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
