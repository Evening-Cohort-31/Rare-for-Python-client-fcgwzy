import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../managers/PostManager";
import { CommentForm } from "../comments/comments";
import { EditButton } from "../buttons/editButton";
// import "./Post.css"

export const PostDetails = () => {
  const [post, setPost] = useState({});
  const { post_id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localRareUser = localStorage.getItem("auth-token");
    if (localRareUser) {
      const userObject = JSON.parse(localRareUser)
      setCurrentUser(userObject);
    }
  }, []);

  useEffect(() => {
    getPostById(post_id).then((data) => {
      setPost(data);
    });
  }, [post_id]);

  const isAuthor = post.user?.id === currentUser?.id;// Add these for debugging
  console.log("Current Logged In User ID:", currentUser?.id);
  console.log("Post Object from Database:", post);
  
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

      <div>
        <span>Tags: </span>
        {post.tags && post.tags.length > 0 ? (
          post.tags.map((tag) => <span key={tag.id}>{tag.label}</span>)
        ) : (
          <span>No tags assigned</span>
        )}
      </div>

      {isAuthor ? (
        <div>
          <button onClick={() => navigate(`/posts/${post_id}/manage-tags`)}>
            Manage Tags
          </button>
          <div>
            <EditButton />
          </div>
        </div>
      ) : (
        <div>Leave a Comment!</div>
      )}
      <CommentForm />
    </section>
  );
};
