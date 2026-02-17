import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPostById } from "../../managers/PostManager"
// import "./Post.css"

export const PostDetails = () => {
    const [post, setPost] = useState({})
    const { postId } = useParams()

useEffect (() => {
    getPostById(postId).then((data) => {
        setPost(data)
    })
}, [postId])

return (
 <section className="post-details">
    <header className="post-header">{post.title}</header>
        <div>
        <span className="post-info"></span>
        {post.image_url?.name}
    </div>
    <div>
        <div>
        <span className="post-info"></span>
        {post.content}
    </div>
        <div>
        <span className="post-info">Date : </span>
        {post.publication_date}
        <span className="post-info">Author : </span>
        {post.author}
    </div>
    </div>
        
</section>
)
}