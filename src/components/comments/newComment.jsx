import { useState } from "react";
import { createComment } from "../../managers/CommentManager";

export const CommentForm = ({ post_id, refreshComments }) => {

    const localUser = localStorage.getItem("auth_token");
    const userId = Number(localUser)

    const [newComment, setNewComment] = useState({
        post_id: parseInt(post_id),
        author_id: parseInt(userId),
        subject: "",
        publication_date: new Date().toISOString().split('T')[0],
        content: ""
    })

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newComment.content) {
        alert("Please enter a comment.");
        return;
    }

    const commentWithDate = {
      ...newComment,
      publication_date: new Date().toISOString().split('T')[0]
    }

    createComment(newComment).then(() => {
        setNewComment({
            post_id: parseInt(post_id),
            author_id: newComment.author_id,
            subject: "",
            content: "",
            publication_date: new Date().toISOString().split('T')[0]
        });
        refreshComments();
        alert("Comment Added!")
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            name="subject"
            value={newComment.subject}
            placeholder="Subject"
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            name="content"
            value={newComment.content}
            placeholder="Write a comment"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary is-small mr-2" type="submit">
            Add Comment
          </button>
        </div>
      </div>
    </form>
  );
};