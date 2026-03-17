import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../managers/PostManager";
import { EditButton } from "../buttons/editButton.jsx";
import { CommentForm } from "../comments/newComment";
import { CommentList } from "../comments/commentList";
import { getAllCommentsForPost } from "../../managers/CommentManager";
import { ReactionBar } from "../reactions/ReactionBar.jsx";
// import "./Post.css"

export const PostDetails = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [currentUser] = useState(localStorage.getItem("auth_token"));

  const getAndSetComments = () => {
    getAllCommentsForPost(post_id).then((data) => {
      setComments(data);
    });
  };

  useEffect(() => {
    getPostById(post_id).then((data) => {
      setPost(data);
    });
  }, [post_id]);

  useEffect(() => {
    getPostById(post_id).then((data) => {
      setPost(data);
    });

    getAndSetComments();
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
    <section className="section">
      <div className="container">
        <button
          className="button is-light mb-5"
          onClick={() => navigate("/posts")}
        >
          ← Back to Posts
        </button>

        <div className="box">
          {post.image_url && (
            <div className="block has-text-centered">
              <figure className="image is-inline-block">
                <img
                  src={post.image_url}
                  alt={post.title}
                  style={{ maxHeight: "300px", width: "auto" }}
                />
              </figure>
            </div>
          )}

          <h1 className="title is-2">{post.title}</h1>

          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <span className="has-text-grey mr-1">By:</span>
                <span
                  className="has-text-link"
                  onClick={() => navigate(`/users/${post.user_id}`)}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {post.author}
                </span>
              </div>
              <div className="level-item">
                <span className="has-text-grey mr-1">Date:</span>
                <span>{post.publication_date}</span>
              </div>
            </div>
          </div>

          <hr />

          <div className="content is-medium">{post.content}</div>

          <hr />

          <div className="field is-grouped is-grouped-multiline">
            <div className="control">
              <span className="has-text-weight-bold mr-2">Tags:</span>
              {post.tags && post.tags.length > 0 ? (
                <div className="tags">
                  {post.tags.map((tag) => (
                    <span key={tag.id} className="tag is-info is-light">
                      {tag.label}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="is-italic has-text-grey">
                  No tags assigned
                </span>
              )}
            </div>
          </div>

          {isAuthor ? (
            <div className="buttons mt-5">
              <button
                className="button is-primary is-small mr-2"
                onClick={() => navigate(`/posts/${post_id}/manage-tags`)}
              >
                Manage Tags
              </button>
              <EditButton route={`/posts/${post_id}/edit`} />
            </div>
          ) : (
            <>
              <div className="notification is-light mt-5">Leave a Comment!</div>
              <ReactionBar post_id={post_id}/>
            </>
          )}
        </div>

        <div className="box has-background-white-ter">
          <h3 className="title is-4">Comments</h3>
          <CommentForm post_id={post_id} refreshComments={getAndSetComments} />
          <hr />
          <CommentList
            comments={comments}
            onUpdateSuccess={getAndSetComments}
          />
        </div>
      </div>
    </section>
  );
};
