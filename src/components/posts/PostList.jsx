import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getAllPosts, getSubscribedPosts } from "../../managers/PostManager";
import { useNavigate, useParams } from "react-router-dom";

export const PostList = () => {
    const [subscribedPosts, setSubscribedPosts] = useState([])
    const location = useLocation()
    const myId = parseInt(localStorage.getItem("token"))
    const isHomepage = location.pathname === "/"
    const [posts, setPosts] = useState([])
    const { post_id } = useParams();

    const navigate = useNavigate();
    

    useEffect(() => {

        getAllPosts().then(setPosts)

        if (isHomepage) {
            getSubscribedPosts(myId).then(setSubscribedPosts)
        }
    }, [isHomepage, myId])

    
    

    return (
        <div className="posts-container">
            <h2>Posts</h2>
                <div className="posts-list">
                        {
                            posts.map(post => {
                                return <section key={`all-post-${post.id}`} className="post">
                                    <div className="post-title" onClick={() => navigate(`posts/${post.id}`)}>{post.title}</div>
                                    <div className="post-author">{post.author}</div>
                                    <div className="post-category">{post.category}</div>
                                </section>
                            })
                        }
                </div>
                {isHomepage && (
                <>
                    <h2>Subscribed Posts</h2>
                    <div className="subposts-list">
                        {
                            subscribedPosts.map(post => {
                                return <section key={`sub-post-${post.id}`} className="post">
                                    <div className="post-title" onClick={() => navigate(`posts/${post.id}`)}>{post.title}</div>
                                    <div className="post-author">{post.author}</div>
                                    <div className="post-category">{post.category}</div>
                                </section>
                            })
                        }
                    </div>
                </>
            )}
        </div>
    )
}