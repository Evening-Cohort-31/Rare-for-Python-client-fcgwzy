import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getUserById } from "../../managers/userManager"
import { createSubscription, getAllSubscriptions } from "../../managers/SubscriptionManager"

export const UserDetail = ({ token }) => {
    const [user, setUser] = useState(null)
    const [subscriptions, setSubscriptions] = useState([])
    const { userId }= useParams()
    const navigate = useNavigate()

    const myId = parseInt(localStorage.getItem("token"))

    useEffect(() => {
        if (token && userId) {
            getUserById(userId).then(userData => {
                setUser(userData)
            })
            getAllSubscriptions().then(setSubscriptions)
        }
    }, [token, userId])

    const isSubscribed = subscriptions.find(sub => 
        sub.author_id === parseInt(userId) && sub.follower_id === myId)
    
    const handleSubscribe = (authorId) => {
        const subscriptionObject = {
        author_id: parseInt(authorId),
        follower_id: myId,
        created_on: new Date().toISOString()
        }
    
        createSubscription(subscriptionObject).then(() => {
            getAllSubscriptions().then(setSubscriptions)
        })
    }


    const formatDate = (dateString) => {
        const date = new Date(dateString)

        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()
        
        let hours = date.getHours()
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12
        hours = hours ? hours : 12 

        return `${month}/${day}/${year} at ${hours}:${minutes}${ampm}`
    }

    if (!user) {
        return <p>Loading user profile...</p>
    }

    return (
        <div className="user-detail-container">
            <button onClick={() => navigate("/users")}>← Back to Users</button>

            <div className="user-profile-card">
                <img
                    src={user.avatar
                        ? user.avatar
                        : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    }
                    alt={`${user.first_name} ${user.last_name}`}
                    className="user-avatar"
                />

                <h2 className="user-full-name">{user.first_name} {user.last_name}</h2>

                <div className="user-detail-fields">
                    <div className="user-detail-field">
                        <span className="field-label">Display Name</span>
                        <span className="field-value">@{user.username}</span>
                    </div>

                    <div className="user-detail-field">
                        <span className="field-label">Email</span>
                        <span className="field-value">{user.email}</span>
                    </div>

                    <div className="user-detail-field">
                        <span className="field-label">Member Since</span>
                        <span className="field-value">{formatDate(user.created_on)}</span>
                    </div>

                    <div className="user-detail-field">
                        <span className="field-label">Account Type</span>
                        <span className="field-value">{user.is_admin ? "Admin" : "Author"}</span>
                    </div>
                    {myId !== parseInt(userId) && (
                        <button 
                            className={isSubscribed ? "subscribed-btn" : "subscribe-btn"}
                            disabled={isSubscribed} 
                            onClick={() => handleSubscribe(userId)}
                        >
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}