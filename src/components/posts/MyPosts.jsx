import { useEffect, useState } from "react"
import { getPostsByUserId } from "../../managers/PostManager"
import { useNavigate } from "react-router-dom"
import { EditButton } from "../buttons/editButton"
// import "./MyPosts.css"

export const MyPosts = ({ token }) => {

    const [userPosts, setUserPosts] = useState([])
    // const [loading, setLoading] = useState(true) 
    const navigate = useNavigate()

    const fetchUserPosts = () => {
        // setLoading(true)
        getPostsByUserId(token)
        .then(postsArray => {
            setUserPosts(postsArray)
            // setLoading(false)
        })
    }

    useEffect(() => {
        if (token) {
            fetchUserPosts()
        }
    }, [token])

// if (loading && (!token || !token.id)) {
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
                        <div key={post.post_id} className="post-item">
                            
                            {/* Title (Clickable link to details - Requirement Met) */}
                            <span 
                                className="post-title"
                                onClick={() => navigate(`/posts/${post.post_id}`)}
                            >
                                {post.title}
                                {post.author}
                                {post.category}
                            </span>
                           

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}