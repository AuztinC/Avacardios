import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, increaseQuantity, decreaseQuantity, address, destination, setDestination, auth })=> {
  
  const lineItemsinCart = lineItems.filter( item => item.order_id === cart.id);
  
  const totalPrice = lineItemsinCart.reduce((total, item) => {
    const product = products.find(product => product.id === item.product_id)
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const userAddresses = address.filter(addy => addy.user_id === auth.id);
  
  if(!lineItems){
    return null
  }
  return (
    <>
    
    <div className='cart'>
      
      <h2>Cart</h2>
      {
         lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? null : <p> Add Items to your cart. </p>
      }
      <ul>
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            return (
              <li key={ lineItem.id }>
                { product.name }
                <p> QTY: { lineItem.quantity }
                <button onClick={() => decreaseQuantity(lineItem)}>-</button>
                <button onClick={() => increaseQuantity(lineItem)}>+</button>
                <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
                </p>
              </li>
            );
          })
        }
        
      </ul>
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id).length ? <p>Order Total: ${ totalPrice }</p> : null
      }
      {
        auth.id ?  
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? (
            <>
            <h4>Deliver to:</h4>
              <select value={destination} onChange={ev => setDestination(ev.target.value)}>
              
                <option value="">Select an Address</option>
                {userAddresses.map(address => (
                  <option key={address.id} value={address.id}>
                    {auth.username} - {address.data.formatted_address}
                  </option>
                ))}
              </select>
            </>
            ) : null
         : null
      }
      {
        userAddresses.length > 0 ? null : <p>No addresses available for delivery. Please add an address <Link style={{textDecoration:'underline'}} to='/account/shipping'>Here -{'>'} </Link></p>
      }
      {
        auth.id ?
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button 
        disabled={ !destination }
        onClick={()=> {
          updateOrder({...cart, is_cart: false, shipping_id: destination });
        }}>Create Order</button>: null
        : null
      }
    </div>
     
    </>
  );
};

export default Cart;