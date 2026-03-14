import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getUserById } from "../../managers/userManager"
import { createSubscription, getAllSubscriptions, unsubscribe } from "../../managers/SubscriptionManager"
import { getPostsByUserId } from "../../managers/PostManager"

export const UserDetail = ({ token }) => {
    const [user, setUser] = useState(null)
    const [subscriptions, setSubscriptions] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const { userId } = useParams()
    const navigate = useNavigate()

    const myId = parseInt(localStorage.getItem("auth_token"))
    const isAdmin = localStorage.getItem("is_admin") === "1"

    const getAndSetSubscriptions = () => {
        getAllSubscriptions().then(setSubscriptions)
    }

    useEffect(() => {
        if (token && userId) {
            getUserById(userId).then(userData => {
                setUser(userData)
            })
            getAndSetSubscriptions()
            getPostsByUserId(userId).then(setUserPosts)
        }
    }, [token, userId])

    const activeSub = subscriptions.find(sub =>
        sub.author_id === parseInt(userId) &&
        sub.follower_id === myId &&
        sub.end_datetime === null
    )

    const handleToggleSubscription = () => {
        if (activeSub) {
            unsubscribe(activeSub.id).then(() => getAndSetSubscriptions())
        } else {
            const subscriptionObject = {
                author_id: parseInt(userId),
                follower_id: myId,
                created_on: new Date().toISOString()
            }
            createSubscription(subscriptionObject).then(() => getAndSetSubscriptions())
        }
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
        <div className="my-profile-container">
            <h2 className="title is-4 has-text-centered">User Profile</h2>

            <div className="columns">

                <div className="column is-one-third has-text-centered">
                    <img
                        src={user.profile_image_url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="profile-avatar"
                    />

                    <div className="box">
                        <h2 className="title is-5">{user.first_name} {user.last_name}</h2>
                        <p><strong>Display Name:</strong> @{user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Member Since:</strong> {formatDate(user.created_on)}</p>
                        <p><strong>Account Type:</strong> {user.is_admin ? "Admin" : "Author"}</p>
                    </div>

                    <div className="buttons is-centered">
                        <button
                            className="button is-light"
                            onClick={() => navigate(isAdmin ? "/users" : "/")}
                        >
                            ← Back
                        </button>
                        {myId !== parseInt(userId) && (
                            <button
                                className={activeSub ? "button is-danger" : "button is-success"}
                                onClick={handleToggleSubscription}
                            >
                                {activeSub ? "Unsubscribe" : "Subscribe"}
                            </button>
                        )}
                    </div>
                </div>

                <div className="column">
                    <div className="box">
                        <h3 className="title is-5">{user.first_name}'s Posts</h3>
                        {userPosts.length === 0 ? (
                            <p>This user has no posts yet.</p>
                        ) : (
                            userPosts.map(post => (
                                <div
                                    key={post.post_id}
                                    className="my-post-item"
                                    onClick={() => navigate(`/posts/${post.post_id}`)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <strong>{post.title}</strong>
                                    <span> — {post.publication_date}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}