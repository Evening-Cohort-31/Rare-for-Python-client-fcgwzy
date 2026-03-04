// Import the CSS


// All other imports:
import { useEffect, useState } from "react"
import { getAllPosts } from "../../managers/PostManager";
import { useNavigate, useParams } from "react-router-dom";


export const PostList = () => {
    const [posts, setPosts] = useState([])
    const { post_id } = useParams();

    const navigate = useNavigate();
    

    useEffect(() => {
        getAllPosts().then((postData) => {
            setPosts(postData)
        })
    }, [])
    

    return (
        <div className="posts-container">
            <h2>Posts</h2>
                <div className="posts-list">
                        {
                            posts.map(post => {
                                return <section key={`post${post.id}`} className="post">
                                    <div className="post-title" onClick={() => navigate(`posts/${post.id}`)}>{post.title}</div>
                                    <div className="post-author">{post.author}</div>
                                    <div className="post-category">{post.category}</div>
                                </section>
                            })
                        }
                </div>
        </div>
    )
}