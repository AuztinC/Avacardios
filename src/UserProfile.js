import React from "react";
import Orders from "./Orders";
import { Link, useParams, Route, Routes } from "react-router-dom";
import Settings from "./Settings";
import WishLists from "./WishLists";
import Users from "./Users";
import User from "./User";
import Shipping from "./Shipping";


const UserProfile = ({ orders, products, lineItems, auth, wishLists, removeWishList, users, updateUser, address, setAddress, createAddress, destination, allOrders })=>{
    const { id } = useParams() 
    return (
    (<div className="user-profile">
        <h1>{ id }</h1>
        <div className="user-section">
            { auth.is_admin ? "*Admin user" : null}
            
            { id === "orders" ? <Orders
                    auth={ auth }
                    orders = { orders }
                    products = { products }
                    lineItems = { lineItems }
                    allOrders = { allOrders }
                    
            /> : null }
            
            { id === 'settings' ? <Settings auth={ auth } updateUser={ updateUser }/> : null}
            
            { id === 'wishlist' ? <WishLists
                products = { products }
                wishLists = { wishLists }
                removeWishList = { removeWishList }
            /> : null}
            
            { id === 'users' ? <Users users={ users } orders={ orders }  /> : null}
            
            { id === 'shipping' ? <Shipping address={address} setAddress={setAddress} createAddress={createAddress} auth={auth} destination={ destination }/> : null}
            
            <User users={ users } lineItems={ lineItems } wishLists={ wishLists } orders={ orders } products={ products } updateUser={ updateUser } allOrders={ allOrders }/>
        </div>
        <div className="user-links">
            <Link to={'/account/wishlist'}>WishList</Link>
            <Link to={'/account/orders'}>Orders</Link>
            <Link to={'/account/shipping'}>Shipping</Link>
            <Link to={'/account/settings'}>Settings</Link>
            { auth.is_admin ? <Link to={'/account/users'}>All Users</Link> : null }
        </div>
    </div>) 
    )
}
export default UserProfile