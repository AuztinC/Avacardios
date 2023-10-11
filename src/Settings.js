import React from "react";

const Settings = ({ auth })=>{
    if(!auth.image){
        return null
    }
    return (<>
        <div className="settings-section">
            <img className="avatar-full" src={`${ auth.image }`} alt="user avatar"/><br></br>
            <button>
                <label htmlFor="file">Edit Avatar</label>
            </button>
            <input type="file" id="file" accept="image/*"/>
        </div>
    </>)
}
export default Settings