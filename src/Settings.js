import React from "react";

const Settings = ({ auth })=>{
    if(!auth.image){
        return null
    }
    return (<>
        <div className="settings-section">
            <img className="avatar-full" src={`${ auth.image }`} alt="user avatar"/><br></br>
            <button>Edit Avatar</button>
        </div>
    </>)
}
export default Settings