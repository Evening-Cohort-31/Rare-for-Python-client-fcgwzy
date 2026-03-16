import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getAllPosts, getSubscribedPosts, updatePost, searchPosts, searchPostsByTag, getPostsByCategory } from "../../managers/PostManager";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar.jsx"
import { getAllCategories } from "../../managers/CategoryManager";


export const PostList = () => {
    const [categories, setCategories] = useState([])
    const [subscribedPosts, setSubscribedPosts] = useState([])
    const location = useLocation()
    const myId = parseInt(localStorage.getItem("token"))
    const isHomepage = location.pathname === "/"
    const [posts, setPosts] = useState([])
    const [displayedPosts, setDisplayedPosts] = useState([])
    const { post_id } = useParams();
    const isAdmin = localStorage.getItem("is_admin") === "1"
    const navigate = useNavigate();

    useEffect(() => {
        getAllPosts().then((data) => {
            setPosts(data)
            setDisplayedPosts(data) 
        })

        if (isHomepage) {
            getSubscribedPosts(myId).then(setSubscribedPosts)
        }
    }, [isHomepage, myId])

    useEffect(() => {
        setDisplayedPosts(posts)
    }, [posts])

    useEffect(() => {
        getAllCategories().then(setCategories)
    }, [])

const handleFilter = (e) => {
    const categoryId = e.target.value
    if (categoryId === "0") {
        getAllPosts().then(setPosts)
    } else {
        getPostsByCategory(categoryId).then(setPosts)
    }
}

const handleSearch = async (query) => {
    const postsByTitle = await searchPosts(query, myId)
    const postsByTag = await searchPostsByTag(query, myId)

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
    <div className="container">
        <h2 className="title">Posts</h2>
        <SearchBar onSearch={handleSearch} />
        
        <div className="field">
            <div className="control">
                <div className="select">
                    <select onChange={handleFilter}>
                        <option value="0">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>

        <div className="columns is-multiline">
            <div className="column is-full">
                <div className="posts-list">
                    {displayedPosts.map(post => (
                        <div key={`all-post-${post.id}`} className="box post mb-4">
                            <div 
                                className="post-title is-size-4 has-text-link" 
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`posts/${post.id}`)}
                            >
                                {post.title}
                            </div>
                            <div className="post-author has-text-purple">{post.author}</div>
                            <div className="post-category tag is-info is-light">{post.category}</div>
                            
                            {isAdmin && (
                                <div className="post-approval mt-2">
                                    <label className="checkbox">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={post.approved === 1}
                                            onChange={() => handleApprovalToggle(post)}
                                        />
                                        Approved
                                    </label>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {isHomepage && (
            <div className="mt-6">
                <h2 className="title">Subscribed Posts</h2>
                <div className="subposts-list">
                    {subscribedPosts.map(post => (
                        <div key={`sub-post-${post.id}`} className="box post mb-4">
                            <div 
                                className="post-title is-size-4 has-text-link" 
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`posts/${post.id}`)}
                            >
                                {post.title}
                            </div>
                            <div className="post-author has-text-purple">{post.author}</div>
                            <div className="post-category tag is-info is-light">{post.category}</div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
)}