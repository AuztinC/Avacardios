import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Orders = ({ orders, products, lineItems, auth, destination, address, allOrders, allAddress })=> {
  const userOrders = orders.filter(order => !order.is_cart && order.user_name === auth.username)
  
  if(!products.length)return <p>Loading...</p>
  if(!auth.is_admin && userOrders.length === 0 || auth.is_admin && !allOrders){
    return <>
      <h2>Check out our fresh produce and make your first order!</h2>
      <Link style={{textDecoration: 'underline'}} to='/products'>All Products -{'>'}</Link>
    </>
  }
  
  return (
    
      <div className='orders'>
        { auth.is_admin ? // If user is admin, see all orders
          allOrders.filter(order => !order.is_cart).map( order => {
            
            const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
            const price = orderLineItems.reduce((acc, curr)=>{
              const product = products.find(product => product.id === curr.product_id);
              return acc += (product.price * curr.quantity) 
            }, 0)
            const orderAddress = allAddress.find(addy => addy.id === order.shipping_id)
            return (
              <div key={ order.id } className='single-order'>
                ({ new Date(order.created_at).toLocaleString() }) User - ({ order.user_name })
                <ul>
                  {
                    orderLineItems.map( lineItem => {
                      const product = products.find(product => product.id === lineItem.product_id);
                      return (
                        <li key={ lineItem.id }>
                          { product ? product.name: '' } - ({ lineItem.quantity })
                        </li>
                      );
                    })
                  }
                </ul>
                <div className='order-address'>
                  <h4>Delivering to:</h4>
                    {order.shipping_id &&  (
                  <p>
                    {order.user_name} - 
                    {orderAddress && orderAddress.data.formatted_address}
                  </p>
                  )}
                </div>
                <div className='cart-product-total'>
                  <p>Order Total:</p> <p><b>${ price.toFixed(2) }</b></p>
                </div>
              </div>
            );
          })
          : // ---- If user is not an admin, see only your orders
          userOrders.map( order => {
          const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id && order.user_id === auth.id);
          const price = orderLineItems.reduce((acc, curr)=>{
            const product = products.find(product => product.id === curr.product_id);
            return acc += (product.price * curr.quantity) 
          }, 0)
          return (
            <div key={ order.id } className='single-order'>
              ({ new Date(order.created_at).toLocaleString() }) 
              {/* <p>Order Total - ${price.toFixed(2)}</p> */}
              <ul>
                {
                  orderLineItems.map( lineItem => {
                    const product = products.find(product => product.id === lineItem.product_id);
                    const productPrice = product.price * lineItem.quantity
                    return (
                      <li key={ lineItem.id }>
                        { product ? product.name : '' } ({ lineItem.quantity }) (${ productPrice })
                      </li>
                    );
                  })
                }
                </ul>
                <div className='order-address'>
                  <h4>Delivering to:</h4>
                  {order.shipping_id && (
                    <div>
                      {order.user_name} - {address.find(addy => addy.id === order.shipping_id).data.formatted_address}
                    </div>
                  )}
                </div>
                <div className='cart-product-total'>
                  <p>Order Total:</p> <p><b>${ price.toFixed(2) }</b></p>
                </div>
            </div>
          );
        })
        }
      </div>
      
    
  );
};

export default Orders;
