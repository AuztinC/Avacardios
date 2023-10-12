import React from "react"
import { useParams } from "react-router-dom"

const User = ({ users, lineItems, wishLists })=>{
    const { id } = useParams()
    // console.log(users)
    const user = users.find(user=>user.id === id)
    return (<div className="admin-user-section">
        <h2>{ user.username }</h2>
    </div>)
}
export default User