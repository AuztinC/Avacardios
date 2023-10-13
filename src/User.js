
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"

const User = ({ users, lineItems, wishLists, orders, products })=>{
    const userId = useParams().user
    let user = users.find(user=>user.id === userId)
    let userOrders = orders.filter(order=>!order.is_cart && order.user_id === userId)
    const userWishLists = wishLists.filter(list=>list.user_id === userId)
    
    useEffect(()=>{
        user = users.find(user=>user.id === userId)
    }, [userId])
    
    if(!user){
        return null
    }
    return (<>
        <h2 className="admin-user-title">{ user.username }'s Profile</h2>
        <div className="admin-user-section">
        <div>
            <h3>{ user.username }'s Oders</h3>
            <ul>
                {userOrders.map( order => {
                    const orderLineItems = lineItems.filter(lineItem => lineItem.order_id === order.id && order.user_id === userId);
                    return (
                        <li key={ order.id }>
                        ({ new Date(order.created_at).toLocaleString() }) 
                        <ul>
                            {
                            orderLineItems.map( lineItem => {
                                const product = products.find(product => product.id === lineItem.product_id);
                                return (
                                <li key={ lineItem.id }>
                                    { product ? product.name : '' } ({ lineItem.quantity })
                                </li>
                                );
                            })
                            }
                        </ul>
                        </li>
                    );
                })}
            </ul> 
            {/*  end orders */}
        </div>
        <div>
            <h3>{ user.username }'s WishLists</h3>
            {
                userWishLists.map(list=>{
                    const product = products.find(product=>product.id === list.product_id)
                    return (
                        <div key={ list.id }>{ product.name }</div>
                    )
                })
            }
        </div>
    </div>
</>)
}
export default User