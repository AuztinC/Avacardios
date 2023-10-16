import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import CartSVG from "./svg/CartSVG";

const Nav = ({ cartCount, auth, logout })=> {
    const welcome = useRef()
        useEffect(()=>{
            if(auth.id){
                setTimeout(()=>{
                    welcome.current.style.display = "none"
                }, 5000)
            }
        },[auth])
    let upperCaseName = null
    if(auth.id){
      upperCaseName = auth.username.charAt(0).toUpperCase() + auth.username.slice(1)
    }
    
    return (
        <nav>
            <div className="nav-inner">
                <Link to='/'>Home</Link>
                <Link to='/products'>Products</Link>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Link to='/cart'>
                        <CartSVG />
                        { cartCount > 0 ? <div className="cart-count">({ cartCount })</div> : null }
                    
                    </Link>
                </div>
                {/* <Link to='/shipping'>Shipping</Link>
                <Link to='/reviews'>Reviews</Link> */}
                <div className="nav-user">
                    { auth.id ? (<>
                        <Dropdown />
                        <button onClick={ logout }>Logout</button>
                        <span className="welcome-message" ref={welcome}>Welcome back, { upperCaseName }!</span>
                    </>) : (<>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/signup'}>Sign Up</Link>
                    </>) }
                </div>
            </div>
        </nav>
    )
}
export default Nav