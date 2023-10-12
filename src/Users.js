import React from "react"
import { Link } from "react-router-dom"

const Users = ({ users, lineItems, wishLists })=>{
    // console.log(users)
    if(!users){
        return null
    }
    return (<div className="admin-user-section">
        {
            users.map(user=>{
                return (
                    <Link  key={ user.id } to={`${ user.id }`}>
                        <h2>{ user.username }</h2>
                        <img className='user-image' src={`${ user.image }`} />
                    </Link>
                )
            })
        }
    </div>)
}
export default Users