import { useEffect, useState } from "react"
import { getPostsByUserId, deletePost } from "../../managers/PostManager"
import { useNavigate } from "react-router-dom"
// import "./MyPosts.css"

export const MyPosts = ({ token }) => {
    const [userPosts, setUserPosts] = useState([])
    const navigate = useNavigate()

    const fetchUserPosts = () => {
        getPostsByUserId(token)
        .then(postsArray => {
            setUserPosts(postsArray)
        })
    }

    useEffect(() => {
        if (token) {
            fetchUserPosts()
        }
    }, [token])

    const handleDelete = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost(postId).then(() => {
                fetchUserPosts() 
            })
        }
    }

return (
        <section className="section">
            <div className="container">
                <h2 className="title">My Rare Posts</h2>
                
                {userPosts.length === 0 ? (
                    <div className="notification is-light">
                        <p>You haven't written any posts yet.</p>
                    </div>
                ) : (
                    <div className="posts-list">
                        {userPosts.map(post => (
                            <div key={post.post_id} className="box">
                                <nav className="level">
                                    {/* Left side: Post Info */}
                                    <div className="level-left">
                                        <div className="level-item">
                                            <div>
                                                <p 
                                                    className="title is-4 has-text-link"
                                                    onClick={() => navigate(`/posts/${post.post_id}`)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {post.title}
                                                </p>
                                                <p className="subtitle is-6 mt-1">
                                                    <span className="has-text-grey">{post.author}</span>
                                                    {post.category && (
                                                        <span className="tag is-info is-light ml-2">
                                                            {post.category}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right side: Delete Action */}
                                    <div className="level-right">
                                        <div className="level-item">
                                            <button 
                                                className="button is-danger is-outlined"
                                                onClick={() => handleDelete(post.post_id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}