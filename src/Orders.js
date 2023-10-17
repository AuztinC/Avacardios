import React from 'react';
import { Link } from 'react-router-dom';

const DeleteOrder = ({product, wishList, addWishList, removeWishList}) => {
  return (
    <div>
      {
        wishList ? <button onClick={() => removeWishList(wishList)}>Remove from Wish List</button>: null
      }
    </div>
  )
}

const Orders = ({ orders, products, lineItems, auth, destination, selectedAddressDetails, allOrders })=> {
  
  const userOrders = orders.filter(order => !order.is_cart && order.user_name === auth.username)
  
  if(userOrders.length === 0){
    return <>
      <h2>Check out our fresh produce and make your first order!</h2>
      <Link style={{textDecoration: 'underline'}} to='/products'>All Products -{'>'}</Link>
    </>
  }
  return (
    <div>
      <ul>
        { auth.is_admin ? // If user is admin, see all orders
          allOrders.filter(order => !order.is_cart).map( order => {
            
            const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
            const price = orderLineItems.reduce((acc, curr)=>{
              
            const product = products.find(product => product.id === curr.product_id);
            return acc += (product.price * curr.quantity) 
            }, 0)
            return (
              <li key={ order.id }>
                ({ new Date(order.created_at).toLocaleString() }) User - ({ order.user_name })
                <p>Order Total - ${price.toFixed(2)}</p>
                <ul>
                  {
                    orderLineItems.map( lineItem => {
                      const product = products.find(product => product.id === lineItem.product_id);
                      return (
                        <li key={ lineItem.id }>
                          { product ? product.name: '' } ({ lineItem.quantity })
                        </li>
                      );
                    })
                  }
                  {
                    <div>
                    <h4>Delivering to:</h4>
                    {selectedAddressDetails && (
                      <div>
                        {destination.customer_name} - {selectedAddressDetails.street}, {selectedAddressDetails.city}, {selectedAddressDetails.state}
                      </div>
                    )}
                  </div>
                  }
                </ul>
              </li>
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
            <li key={ order.id }>
              ({ new Date(order.created_at).toLocaleString() }) 
              <p>Order Total - ${price.toFixed(2)}</p>
              <ul>
                {
                  orderLineItems.map( lineItem => {
                    const product = products.find(product => product.id === lineItem.product_id);
                    return (
                      <li key={ lineItem.id }>
                        { product ? product.name : '' }
                      </li>
                    );
                  })
                }
              </ul>
            </li>
          );
        })
        }
      </ul>
      
    </div>
  );
};

export default Orders;
