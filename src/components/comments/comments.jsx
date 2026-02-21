import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createComment } from "../../managers/CommentManager";

export const CommentForm = () => {
    const navigate = useNavigate();
    const { post_id } = useParams();

    const localUser = localStorage.getItem("auth_token");
    const userObject = JSON.parse(localUser)

    const [newComment, setNewComment] = useState({
        post_id: parseInt(post_id),
        author_id: userObject.id,
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

    createComment(newComment)
  }


  return (
    <form className="comment-add-form" onSubmit={handleSubmit}>
      <input
        className="comment-input"
        type="text"
        name="content"
        value={newComment.content}
        placeholder="Write a comment"
        onChange={handleInputChange}
      />
      <button type="submit" className="comment-input-submit">
        Add Comment
      </button>
    </form>
  );
};
