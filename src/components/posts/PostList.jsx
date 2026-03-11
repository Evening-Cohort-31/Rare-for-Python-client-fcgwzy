import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getAllPosts, getSubscribedPosts, updatePost, searchPosts } from "../../managers/PostManager";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar.jsx"
import { searchPostsByTag } from "../../managers/PostManager.js";

export const PostList = () => {
    const [subscribedPosts, setSubscribedPosts] = useState([])
    const location = useLocation()
    const myId = parseInt(localStorage.getItem("token"))
    const isHomepage = location.pathname === "/"
    const [posts, setPosts] = useState([])
    const [displayedPosts, setDisplayedPosts] = useState([])  // ⬅️ add this
    const { post_id } = useParams();
    const isAdmin = localStorage.getItem("is_admin") === "1"
    const navigate = useNavigate();

    useEffect(() => {
        getAllPosts().then((data) => {
            setPosts(data)
            setDisplayedPosts(data)  // ⬅️ add this
        })

        if (isHomepage) {
            getSubscribedPosts(myId).then(setSubscribedPosts)
        }
    }, [isHomepage, myId])

    useEffect(() => {
        setDisplayedPosts(posts)
    }, [posts])

const handleSearch = async (query) => {
    const postsByTitle = await searchPosts(query)
    const postsByTag = await searchPostsByTag(query)

    const postMap = new Map()

    for (const post of postsByTitle) {
        postMap.set(post.id, post)
    }

    for (const post of postsByTag) {
        postMap.set(post.id, post)
    }

    setDisplayedPosts([...postMap.values()])
}

 
const getAndSetSubscribedPosts = () => {
    if (isHomepage && myId) {
        getSubscribedPosts(myId).then(setSubscribedPosts)
    }
}

    useEffect(() => {
        getAllPosts().then(setPosts)
        getAndSetSubscribedPosts()
    }, [isHomepage, myId])

const handleApprovalToggle = (post) => {
    const updatedPost = {
        ...post,
        approved: post.approved === 1 ? 0 : 1
    }

    setDisplayedPosts(prev =>
        prev.map(p => (p.id === post.id ? updatedPost : p))
    )
    setPosts(prev =>
        prev.map(p => (p.id === post.id ? updatedPost : p)) 
    )

    updatePost(post.id, updatedPost).catch(err => {
        console.error("Failed to update post approval", err)
        setDisplayedPosts(prev =>
            prev.map(p => (p.id === post.id ? post : p))
        )
        setPosts(prev =>
            prev.map(p => (p.id === post.id ? post : p))
        )
    })
}

    return (
        <div className="posts-container">
            <h2>Posts</h2>
            <SearchBar onSearch={handleSearch} />
            <div className="posts-list">
                {
                    displayedPosts.map(post => {
                        return <section key={`all-post-${post.id}`} className="post">
                            <div className="post-title" onClick={() => navigate(`posts/${post.id}`)}>{post.title}</div>
                            <div className="post-author">{post.author}</div>
                            <div className="post-category">{post.category}</div>
                            <div className="post-approval">
                                                {isAdmin && (
                                                    <label>
                                                        Approved
                                                        <input
                                                            type="checkbox"
                                                            checked={post.approved === 1}
                                                            onChange={() => handleApprovalToggle(post)}
                                                        />
                                                    </label>
                                                )}
                                            </div>
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
