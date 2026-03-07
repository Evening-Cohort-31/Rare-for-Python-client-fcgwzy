import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../managers/PostManager";
import { CommentForm } from "../comments/comments";
import { EditButton } from "../buttons/EditButton.jsx"
// import "./Post.css"

export const PostDetails = () => {
  const [post, setPost] = useState({});
  const { post_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(post_id).then((data) => {
      setPost(data);
    });
  }, [post_id]);

  return (
    <section className="post-details">
      <header className="post-header">{post.title}</header>
      <div>
        <span className="post-info"></span>
        {post.image_url}
      </div>
      <div>
        <div>
          <span className="post-info"></span>
          {post.content}
        </div>
        <div>
          <span className="post-info">Date: </span>
          {post.publication_date}
          <span className="post-info">Author: </span>
          {post.author}
        </div>
      </div>
      <CommentForm />
      <div>
        <span>Tags: </span>
        {post.tags && post.tags.length > 0 ? (
          post.tags.map((tag) => <span key={tag.id}>{tag.label}</span>)
        ) : (
          <span>No tags assigned</span>
        )}
      </div>
      <button onClick={() => navigate(`/posts/${post_id}/manage-tags`)}>
        Manage Tags
      </button>
      <div>
        <EditButton />
      </div>
    </section>
  );
};
