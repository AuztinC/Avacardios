
import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

const User = ({ users, lineItems, wishLists, orders, products, updateUser })=>{
    const userId = useParams().user
    let user = users.find(user=>user.id === userId)
    let userOrders = orders.filter(order=>!order.is_cart && order.user_id === userId)
    const userWishLists = wishLists.filter(list=>list.user_id === userId)
    const [vip, setVip] = useState(false)
    const [open, setOpen] = useState(false)
    const select = useRef()
    
    useEffect(()=>{
        user = users.find(user=>user.id === userId)
        if(user){
            setVip( !user.vip ? false : true)
        }
        
    }, [userId, users])
    
    function submit(ev){
        ev.preventDefault()
        const updatedUser = {...user, vip: vip}
        updateUser(updatedUser)
        setOpen(false)
    }
    
    if(!user){
        return null
    }
    
    return (<>
        <h2 className="admin-user-title">{ user.username }'s Profile</h2>
        {/* Vip user section */}
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h4 style={{marginRight: '15px'}}>Vip User? </h4>
            
            { !open ? (<>
                <h5>{ user.vip ? "True" : "False" }</h5>
                <button onClick={()=>setOpen(true)}> Edit User Vip </button>
            </>) : <form onSubmit={ submit } style={{flexDirection: 'row'}}>
                <select ref={select} onChange={(ev)=>{
                        if(ev.target.value === 'false'){
                            setVip(false)
                        } else if ( ev.target.value === 'true') setVip(true)
                    }
                }>
                    <option>{ user.vip ? "*True" : "*False"}</option>
                    <option style={ user.vip ? {display: 'none'} : {display: 'block'}} value={true} >True</option>
                    <option style={ user.vip ? {display: 'block'} : {display: 'none'}} value={false} >False</option>
                </select>
                <button disabled={ user.vip === vip ? true : false}> Commit </button>
                <button onClick={()=> setOpen(false)}> Cancel </button>
            </form>}
            
        </div>
        {/* Single User Orders and Wishlists */}
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