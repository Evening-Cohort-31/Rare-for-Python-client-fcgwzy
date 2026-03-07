import { useEffect, useState } from "react"
import { getPostsByUserId, deletePost } from "../../managers/PostManager"
import { useNavigate } from "react-router-dom"
import { EditButton } from "../buttons/EditButton"
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
        <div className="posts-container">
            <h2 className="posts-header">My Rare Posts</h2>
            
            {userPosts.length === 0 ? (
                <p>You haven't written any posts yet.</p>
            ) : (
                <div className="posts-list">
                    {userPosts.map(post => (
                        <div key={post.post_id} className="post-item">
                            <span 
                                className="post-title"
                                onClick={() => navigate(`/posts/${post.post_id}`)}
                            >
                                {post.title}
                                {post.author}
                                {post.category}
                            </span>

                            <button 
                                onClick={() => handleDelete(post.post_id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}