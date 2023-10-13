import React from 'react';
import Cart from './Cart';

const Orders = ({ orders, products, lineItems, auth, selectedAddress, selectedAddressDetails })=> {
  
  const userOrders = orders.filter(order => !order.is_cart && order.user_name === auth.username)

  
  if(userOrders.length === 0){
    return <h2>It looks like you haven't placed any orders yet.</h2>
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
                ({ new Date(order.created_at).toLocaleString() }) ({ order.user_name })
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
