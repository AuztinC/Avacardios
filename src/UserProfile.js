import React from "react";
import Orders from "./Orders";
import { Link, useParams } from "react-router-dom";
import Settings from "./Settings";

const UserProfile = ({ orders, products, lineItems, auth })=>{
    // ---- Using Params to display each
    // ---- section of users "account"
    const { id } = useParams() 
    // All users can change their avatar 
    return (
    (<div className="user-profile">
        <h1>{ id }</h1>
        <div className="user-section">
            { id.includes("orders") ? <Orders
                    auth={ auth }
                    orders = { orders }
                    products = { products }
                    lineItems = { lineItems }
            /> : null }
            { id.includes('settings') ? <Settings auth={ auth }/> : null}
        </div>
        <div className="user-links">
            <Link to={'/account/settings'}>Settings</Link>
            <Link to={'/account/orders'}>Orders</Link>
        </div>
    </div>) 
    )
}
export default UserProfile