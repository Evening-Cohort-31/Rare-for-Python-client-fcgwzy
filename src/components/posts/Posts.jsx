// import "./Post.css"

export const Post = ({ post }) => {
    return (
         <div className="post">
                    <div>
                        <div className="post-info">Title</div>
                        <div>{post.title}</div>
                    </div>
                    <div>
                        <div className="post-info">Author</div>
                        <div>{post.author?.name}</div>
                    </div>
                    <div>
                        <div className="post-info">Category</div>
                        <div>{post.category?.length}</div>
                    </div>
                </div>
    )
}