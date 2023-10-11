import React from "react";
import Orders from "./Orders";
import { Link, useParams } from "react-router-dom";
import Settings from "./Settings";
import WishLists from "./WishLists";

const UserProfile = ({ orders, products, lineItems, auth, wishLists, removeWishList })=>{
    // ---- Using Params to display each
    // ---- section of users "account"
    const { id } = useParams() 
    // All users can change their avatar 
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
            /> : null }
            { id === 'settings' ? <Settings auth={ auth }/> : null}
            { id === 'wishlist' ? <WishLists
                products = { products }
                wishLists = { wishLists }
                removeWishList = { removeWishList }
            /> : null}
        </div>
        <div className="user-links">
            <Link to={'/account/wishlist'}>WishList</Link>
            <Link to={'/account/orders'}>Orders</Link>
            <Link to={'/account/settings'}>Settings</Link>
        </div>
    </div>) 
    )
}
export default UserProfile