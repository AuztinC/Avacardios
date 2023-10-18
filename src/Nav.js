import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import CartSVG from "./svg/CartSVG";
import VipCrown from "./svg/VipCrown";

const Nav = ({ cartCount, auth, logout })=> {
    const welcome = useRef()
    const vip = useRef()
    const _username = useRef()
    
        useEffect(()=>{
            if(auth.id){
                setTimeout(()=>{
                    welcome.current.style.display = "none"
                    if(auth.vip){
                        vip.current.style.visibility = "visible"
                    } else {
                        
                        _username.current.style.visibility = 'visible'
                    }
                    
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
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'fit-content'}}>
                    <Link to='/cart'>
                        <CartSVG />
                        { cartCount > 0 ? <div className="cart-count">({ cartCount })</div> : null }
                    
                    </Link>
                </div>
                <div>
                    { auth.vip === true ? 
                    <>
                        <VipCrown /> 
                        <p ref={vip}
                            style={{
                            position: 'absolute', 
                            top: "85px", 
                            visibility: 'hidden',
                            left: 0}}>
                                VIP - { upperCaseName }
                        </p>
                    </>
                    : 
                    <p ref={_username}
                        style={{
                        position: 'absolute', 
                        // top: "85px", 
                        visibility: 'hidden',
                        left: 0}}>
                            { upperCaseName }
                    </p>}
                    
                </div>
                <div className="nav-user">
                    { auth.id ? (<>
                        <Dropdown />
                        <button onClick={ logout }>Logout</button>
                        <span className="welcome-message" ref={welcome}>Welcome { upperCaseName }!</span>
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