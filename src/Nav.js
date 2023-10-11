import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const Nav = ({ cartCount, auth, logout })=> {
    
    let upperCaseName = null
    if(auth.id){
      upperCaseName = auth.username.charAt(0).toUpperCase() + auth.username.slice(1)
    }
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/products'>Products</Link>
            <Link to='/cart'>Cart ({ cartCount })</Link>
            <Link to='/reviews'>Reviews</Link>
            { auth.id ? (<>
                <span>Welcome back, { upperCaseName }!</span>
                <Dropdown />
                <button onClick={ logout }>logout</button>
            </>) : (<>
                <Link to={'/login'}>Login</Link>
                <Link to={'/signup'}>Sign Up</Link>
            </>) }
        </nav>
    )
}
export default Nav