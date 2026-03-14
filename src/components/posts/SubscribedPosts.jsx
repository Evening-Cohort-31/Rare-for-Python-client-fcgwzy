import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSubscribedPosts } from "../../managers/PostManager"

export const SubscribedPosts = ({ token }) => {
    const [subscribedPosts, setSubscribedPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getSubscribedPosts(token).then(setSubscribedPosts)
    }, [token])

    return (
        <div className="subscribed-posts-container">
            <h2>Subscribed Posts</h2>
            {subscribedPosts.length === 0 ? (
                <p>You are not subscribed to any users yet.</p>
            ) : (
                subscribedPosts.map(post => (
                    <div
                        key={post.id}
                        className="subscribed-post-item"
                        onClick={() => navigate(`/posts/${post.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <strong>{post.title}</strong>
                        <span> — {post.username}</span>
                        <span> — {post.publication_date}</span>
                    </div>
                ))
            )}
        </div>
    )
}