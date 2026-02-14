import { useEffect, useState } from "react"
import { deletePost, getPostsByUserId } from "../../managers/PostManager"
import { useNavigate } from "react-router-dom"
// import "./MyPosts.css"

export const MyPosts = ({ setToken }) => {

    const [userPosts, setUserPosts] = useState([])
    // const [loading, setLoading] = useState(true) 
    const navigate = useNavigate()

    const fetchUserPosts = () => {
        // setLoading(true)
        getPostsByUserId(setToken.id)
        .then(postsArray => {
            setUserPosts(postsArray)
            // setLoading(false)
        })
    }

    useEffect(() => {
        if (setToken && setToken.id) {
            fetchUserPosts()
        }
    }, [setToken])

    const handleDelete = (postId) => {
        deletePost(postId).then(() => {
            setUserPosts(prevPosts => 
                prevPosts.filter(post => post.id !== postId)
            )
        })
    }
// if (loading && (!setToken || !setToken.id)) {
//          return <p>Authenticating user...</p>
//     }
    
//     if (loading) {
//         return <p>Loading your posts...</p>
//     }

    return (
        <div className="posts-container">
            <h2 className="posts-header">My Rare Posts</h2>
            
            {/* --- Empty List Message (UX enhancement) --- */}
            {userPosts.length === 0 ? (
                <p>You haven't written any posts yet.</p>
            ) : (
                <div className="posts-list">
                    {userPosts.map(post => (
                        <div key={post.id} className="post-item">
                            
                            {/* Title (Clickable link to details - Requirement Met) */}
                            <span 
                                className="post-title"
                                onClick={() => navigate(`/posts/${post.id}`)}
                            >
                                {post.title}
                                {post.author}
                                {post.category}
                            </span>

                            {/* Delete Button (Requirement Met) */}
                            <button 
                                className="delete-btn"
                                onClick={() => handleDelete(post.id)}
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