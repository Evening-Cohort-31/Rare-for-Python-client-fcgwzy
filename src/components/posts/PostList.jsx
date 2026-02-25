// Import the CSS


// All other imports:
import { useEffect, useState } from "react"
import { getAllPosts } from "../../managers/PostManager";

export const PostList = () => {
    const [posts, setPosts] = useState([])

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
                                    <div className="post-title">{post.title}</div>
                                    <div className="post-author">{post.author}</div>
                                    <div className="post-category">{post.category}</div>
                                </section>
                            })
                        }
                </div>
        </div>
    )
}