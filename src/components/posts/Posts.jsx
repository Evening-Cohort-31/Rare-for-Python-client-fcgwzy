import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../managers/PostManager";
import { EditButton } from "../buttons/EditButton";
import { CommentForm } from "../comments/newComment";
import { CommentList } from "../comments/commentList";
// import "./Post.css"

export const PostDetails = () => {
  const [post, setPost] = useState({});
  const { post_id } = useParams();

  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("auth_token"),
  );
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(post_id).then((data) => {
      setPost(data);
    });
  }, [post_id]);

  const loggedInId = Number(currentUser); 
  const authorId = Number(post?.user_id);

  const isAuthor =
    loggedInId !== 0 && authorId !== 0 && loggedInId === authorId;

  // Updated logs to help you see the match
  console.log("Logged In ID:", loggedInId);
  console.log("Post Author ID:", authorId);
  console.log("Do they match?", isAuthor);

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
      <CommentForm/>
      <CommentList/>
    </section>
  );
};
