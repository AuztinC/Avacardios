
import React, { useState, useRef, useEffect } from "react";

const Settings = ({ auth, updateUser })=>{
    const [newUsername, setNewUsername] = useState('')
    const usernameForm = useRef()
    const updateButton = useRef()
    const fileEl = useRef()
    
    
    function submit(ev){
        ev.preventDefault()
        const user = {
            id: auth.id,
            username: newUsername,
            image: auth.image,
            vip: auth.vip
        }
        updateUser( user )
        setNewUsername('')
        usernameForm.current.style.visibility = 'hidden'
        updateButton.current.innerText = 'Edit Username'
    }
    
    function updateFile(ev){
        const file = ev.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', ()=>{
            const user = {
                id: auth.id,
                username: auth.username,
                image: reader.result
            }
            updateUser( user )
        })
    }
    
    // ---- Display username form ---- // 
    function flipForm(){ 
        if(usernameForm.current.style.visibility === 'hidden'){
            usernameForm.current.style.visibility = 'visible'
            updateButton.current.innerText = 'Cancel'
        } else {
            usernameForm.current.style.visibility = 'hidden'
            updateButton.current.innerText = 'Edit Username'
        }
    }

    return (<>
        <div className="settings">
            <div className="settings-section">
                <img className="user-image" src={ `${ auth.image ? auth.image : './assets/avatar01.png'}` } alt="user avatar"/><br></br>
                <button>
                    <label htmlFor="file">Edit Avatar</label> 
                </button>
                { auth.image ? <button>Remove Avatar</button> : null}
                <input type="file" id="file" accept="image/*" ref={ fileEl } onChange={ updateFile }/>
            </div>
            
            <div className="settings-section">
                { auth.vip ? <span>VIP</span> : null}
                <p>Account Username | { auth.username }</p>
                <button ref={updateButton} onClick={ flipForm }>Edit Username</button>
                <form style={{visibility: 'hidden'}} ref={usernameForm} onSubmit={ submit }>
                    <input type="text" value={ newUsername } onChange={(ev)=>setNewUsername(ev.target.value)}/>
                    <button style={{transitionProperty: "none"}}>Submit</button>
                </form> 
            </div>
            
        </div>
    </>)
}
export default Settings