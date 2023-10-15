import React from 'react';
import { Link } from 'react-router-dom';

const Orders = ({ orders, products, lineItems, auth, selectedAddress, selectedAddressDetails })=> {
  
  const userOrders = orders.filter(order => !order.is_cart && order.user_name === auth.username)
  // console.log(orders)
  
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
          orders.filter(order => !order.is_cart).map( order => {
            const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
            // console.log(lineItems)
            return (
              <li key={ order.id }>
                ({ new Date(order.created_at).toLocaleString() }) User - ({ order.user_name })
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
                        {selectedAddress.customer_name} - {selectedAddressDetails.street}, {selectedAddressDetails.city}, {selectedAddressDetails.state}
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
          return (
            <li key={ order.id }>
              ({ new Date(order.created_at).toLocaleString() }) 
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
