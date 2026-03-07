// Import the CSS


// All other imports:
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getAllPosts, getSubscribedPosts } from "../../managers/PostManager";

export const PostList = () => {
    const [allPosts, setAllPosts] = useState([])
    const [subscribedPosts, setSubscribedPosts] = useState([])
    const location = useLocation()
    const myId = parseInt(localStorage.getItem("token"))
    const isHomepage = location.pathname === "/"

    useEffect(() => {

        getAllPosts().then(setAllPosts)

        if (isHomepage) {
            getSubscribedPosts(myId).then(setSubscribedPosts)
        }
    }, [isHomepage])
    

    return (
        <div className="posts-container">
            <h2>Posts</h2>
                <div className="posts-list">
                        {
                            allPosts.map(post => {
                                return <section key={`post${post.id}`} className="post">
                                    <div className="post-title">{post.title}</div>
                                    <div className="post-author">{post.author}</div>
                                    <div className="post-category">{post.category}</div>
                                </section>
                            })
                        }
                </div>
            <h2>Subscribed Posts</h2>
                                <div className="subposts-list">
                        {
                            subscribedPosts.map(post => {
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