import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSubscribedPosts } from "../../managers/PostManager"

export const SubscribedPosts = ({ token }) => {
    const [subscribedPosts, setSubscribedPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getSubscribedPosts(token).then(setSubscribedPosts)
    }, [token])

    const formatDate = (dateString) => {
    if (!dateString) return "";

    // The .replace ensures older browsers handle the string correctly
    const date = new Date(dateString.replace(/-/g, '\/'));

    return date.toLocaleString("en-US", {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true // Ensures AM/PM format
    });
};

return (
        <section className="section">
            <div className="container">
                <h2 className="title">Subscribed Posts</h2>
                
                {subscribedPosts.length === 0 ? (
                    <div className="notification is-light">
                        <p>You are not subscribed to any users yet.</p>
                    </div>
                ) : (
                    <div className="columns is-multiline">
                        {subscribedPosts.map(post => (
                            <div key={post.id} className="column is-12">
                                <article 
                                    className="box media" 
                                    onClick={() => navigate(`/posts/${post.id}`)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="media-content">
                                        <div className="content">
                                            <p>
                                                <strong className="is-size-4 has-text-link">
                                                    {post.title}
                                                </strong>
                                                <br />
                                                <small className="has-text-grey">
                                                    @{post.username} — {formatDate(post.publication_date)}
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="media-right is-vcentered">
                                        <span className="icon has-text-grey-light">
                                            <i className="fas fa-chevron-right"></i>
                                        </span>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
