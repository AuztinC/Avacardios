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
    
    <div >
      <div className='cart-header'>
        <h1 >Your Cart</h1>
      </div>
      <div className='cart'>
      {
         lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? null : <p> Add Items to your cart. </p>
      }
      <ul>
        {
          lineItems.filter(lineItem=> lineItem.order_id === cart.id).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            const price = product.price * lineItem.quantity
            return (
              <li key={ lineItem.id }>
                <h3>{ product.name }</h3>
                <p>${ product.price } each</p>
                <p> QTY: { lineItem.quantity }
                <button onClick={() => decreaseQuantity(lineItem)}>-</button>-<button onClick={() => increaseQuantity(lineItem)}>+</button>
                <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
                </p>
                <div className='cart-product-total'>
                  <p>Product Total:</p> <p><b>${ price }</b></p>
                </div>
              </li>
            );
          })
        }
        
      </ul>
      <div className='cart-totals' style={lineItemsinCart.length > 0 ? { visibility: 'visible'} : { visibility: 'hidden' }}>
      {
        lineItems.filter(lineItem => lineItem.order_id === cart.id).length ? <p>Order Total: ${ totalPrice }</p> : null
      }
      
      {
        auth.id ?  
        lineItems.filter(lineItem => lineItem.order_id === cart.id ).length ? (
            <div className='deliver-to-section'>
            <h4>Deliver to:</h4>
              <select value={destination} onChange={ev => setDestination(ev.target.value)}>
              
                <option value="">Select an Address</option>
                {userAddresses.map(address => (
                  <option key={address.id} value={address.id}>
                    {auth.username} - {address.data.formatted_address}
                  </option>
                ))}
              </select>
            </div>
            ) : null
         : null
      }
      
      {
        userAddresses.length > 0 ? null : <p>No addresses available for delivery. Please add an address in your <Link to='/account/shipping'> Settings </Link></p>
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
      </div>
    </div>
     
    </>
  );
};

export default Cart;