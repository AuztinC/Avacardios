import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DropdownMenu = ({ setOpen, open })=>{
    window.addEventListener("click", (ev)=>{
        if(ev.target.className !== "menu-item" && ev.target.className !== "dropdown-btn"){
            setOpen(false)
        }
    })
    
    const DropdownItem = (props)=>{
        return (
                <Link className="menu-item"
            onClick={()=>setOpen(false)} to={`/account/${ props.children.toLowerCase() }`}>{ props.children }</Link>
            
        )
    }
    
    return (<div className={`menu ${ open ? "menu-open" : ""}`}>
        <DropdownItem>Wishlist</DropdownItem>
        <DropdownItem>Orders</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
    </div>)
}
const Dropdown =()=>{
    const [open, setOpen] = useState(false)
    
    return  (<div className={`dropdown-menu`}>
        <button className={`dropdown-btn`} onClick={()=>setOpen(!open)}>Account</button>
        <DropdownMenu setOpen={ setOpen } open={ open }/>
    </div>)
}
export default Dropdown