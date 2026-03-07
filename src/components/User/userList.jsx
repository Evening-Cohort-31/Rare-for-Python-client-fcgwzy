import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllUsers } from "../../managers/userManager"

export const UserList = ({ token }) => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            getAllUsers().then(usersArray => {
                setUsers(usersArray)
            })
        }
    }, [token])

    return (
        <div className="users-container">
            <h2 className="users-header">User Profiles</h2>

            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div className="users-list">
                    {users.map(user => (
                        <div
                            key={user.id}
                            className="user-item"
                            onClick={() => navigate(`/users/${user.id}`)}
                        >
                            <span className="user-name">
                                {user.first_name} {user.last_name}
                            </span>
                            <span className="user-username">@{user.username}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}