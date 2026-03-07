import { useEffect, useState } from "react"
import { getAllUsers } from "../../managers/userManager"
import { useNavigate } from "react-router-dom"

export const UserList = ({ token }) => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            getAllUsers().then(usersArray => {
                console.log("users before sort:", usersArray)

                const sorted = usersArray.sort((a, b) =>
                    a.username.localeCompare(b.username)
                )
                setUsers(sorted)
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
                                {user.username} 
                            </span>
                            <span className="user-username"> ... {user.first_name} {user.last_name}</span>
                            <span className="user-type">
                                {user.is_admin ? " Admin" : " Author"}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}