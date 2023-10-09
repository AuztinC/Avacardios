import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownMenu = ({ setOpen })=>{
    
    const DropdownItem = (props)=>{
        return (
            <div className="menu-item"
            onClick={()=>setOpen(false)}>
                <Link to={`/account/${ props.children.toLowerCase() }`}>{ props.children }</Link>
            </div>
        )
    }
    
    return (<div className="menu">
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Orders</DropdownItem>
    </div>)
}
const Dropdown =()=>{
    const [open, setOpen] = useState(false)
    return (<div className="dropdown-menu">
        <button onClick={()=>setOpen(!open)}>Account</button>
        { open ? <DropdownMenu setOpen={ setOpen }/> : null }
    </div>)
}
export default Dropdown