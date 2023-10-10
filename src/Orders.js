import React from 'react';

const Orders = ({ orders, products, lineItems, auth })=> {
  return (
    <div>
      <ul>
        { auth.is_admin ? // If user is admin, see all orders
          orders.filter(order => !order.is_cart).map( order => {
            const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id);
            return (
              <li key={ order.id }>
                ({ new Date(order.created_at).toLocaleString() }) ({ auth.username })
                <ul>
                  {
                    orderLineItems.map( lineItem => {
                      const product = products.find(product => product.id === lineItem.product_id);
                      return (
                        <li key={ lineItem.id }>
                          { product ? product.name: '' }
                        </li>
                      );
                    })
                  }
                </ul>
              </li>
            );
          })
        : // ---- If user is not an admin, see only your orders
        orders.filter(order => !order.is_cart).map( order => {
          const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id && lineItem.user_id === auth.id);
          return (
            <li key={ order.id }>
              ({ new Date(order.created_at).toLocaleString() })
              <ul>
                {
                  orderLineItems.map( lineItem => {
                    const product = products.find(product => product.id === lineItem.product_id);
                    return (
                      <li key={ lineItem.id }>
                        { product ? product.name: '' }
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
