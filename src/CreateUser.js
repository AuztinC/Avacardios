import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const CreateUser = ({ createUser })=> {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [admin, setAdmin] = useState(false)
    const [error, setError] = useState('')
    
    const navigate = useNavigate()
    
    async function submit(ev){
        ev.preventDefault()
        const user = {
            username,
            password,
            is_admin: admin
        }
        try {
            await createUser( user, setError )
            navigate('/login')
        } catch (error) {
            setError(error)
            console.log(error.response.data.message)
        }
    }
    
    return (<div className='signup'>
        <form onSubmit={ submit }>
            <input type='text' placeholder='username' value={username} onChange={(ev)=>setUsername(ev.target.value)}/>
            <input type='password' placeholder='password' value={password} onChange={(ev)=>setPassword(ev.target.value)}/>
            
            <div className='admin-check'>
                <label>Admin User?
                    <input type='checkbox' onChange={()=>setAdmin(!admin)} value={admin}/>
                </label>
            </div>
            
            <button disabled={ !username || !password ? true : false}>Create Account</button>
            { error ? <p className='error'>{error.response.data.message}</p> : null}
        </form>
    </div>)
}
export default CreateUser