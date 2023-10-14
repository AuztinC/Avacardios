import React from "react"
import { Link } from "react-router-dom"

const Users = ({ users })=>{
    // console.log(users)
    if(!users){
        return null
    }
    return (<div className="admin-users">
        {
            users.map(user=>{
                return (
                    <Link  key={ user.id } to={`/account/users/${ user.id }`}>
                        <h2>{ user.username }</h2>
                        <img className='user-image' src={`${ user.image ? user.image : './assets/avatar01.png'}`} />
                    </Link>
                )
            })
        }
    </div>)
}
export default Users