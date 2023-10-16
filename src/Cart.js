import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products, increaseQuantity, decreaseQuantity, address, selectedAddress, setSelectedAddress, auth })=> {
  
  const lineItemsinCart = lineItems.filter( item => item.order_id === cart.id);
  const totalPrice = lineItemsinCart.reduce((total, item) => {
    const product = products.find(product => product.id === item.product_id)
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  
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
      {/* {
        auth.id ?  
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? (
            <>
            <h4>Deliver to:</h4>
              <select value={selectedAddress} onChange={e => setSelectedAddress(e.target.value)}>
              
                <option value="">Select an Address</option>
                {userAddresses.map(address => (
                  <option key={address.id} value={address.id}>
                    {address.customer_name} - {address.street}, {address.city}, {address.state}
                  </option>
                ))}
              </select>
            </>
            ) : null
         : null
      }
      {
        userAddresses.length > 0 ? null : <p>No addresses available for delivery. Please add an address <Link to='/shipping'>Here.</Link></p>
      }
      {
        auth.id ?
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? <button onClick={()=> {
          handleSelect();
          updateOrder({...cart, is_cart: false });
        }}>Create Order</button>: null
        : null
      } */}
      <hr/>
    </div>
     
    </>
  );
};

export default Cart;
