import { useState } from "react"
import { useParams } from "react-router-dom";
import { DeleteButton } from "../buttons/deleteButton.jsx"
import { deleteComment, updateComment } from "../../managers/CommentManager";

export const Comment = ({ commentInstance, onUpdateSuccess }) => {
  const [currentUser] = useState(localStorage.getItem("auth_token"));
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState({
    subject: commentInstance.subject,
    content: commentInstance.content,
  });

  const commentAuthorId = Number(currentUser);
  const authorId = Number(commentInstance.author_id);
  const isAuthor = commentAuthorId !== 0 && commentAuthorId === authorId;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditValue({ ...editValue, [name]: value });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const commentToSend = {
      id: commentInstance.id,
      post_id: commentInstance.post_id,
      author_id: commentInstance.author_id,
      publication_date: commentInstance.publication_date,
      subject: editValue.subject,
      content: editValue.content,
    };

    try {
      const response = await updateComment(commentToSend);
      if (response.ok) {
        setIsEditing(false);
        onUpdateSuccess();
      } else {
        const errorText = await response.text();
        console.error("Server rejected update:", errorText);
        alert("Server error: " + response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (confirmed) {
      const response = await deleteComment(commentInstance.id);
      if (response.ok) {
        onUpdateSuccess();
      } else {
        alert("Failed to delete the comment.");
      }
    }
  };

  // --- EDITING VIEW ---
  if (isEditing) {
    return (
      <div className="box">
        <form onSubmit={handleSave}>
          <div className="field">
            <label className="label">Subject</label>
            <div className="control">
              <input
                className="input"
                name="subject"
                value={editValue.subject}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <textarea
                className="textarea"
                name="content"
                value={editValue.content}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="buttons">
            <button className="button is-link" type="submit">Save</button>
            <button className="button is-light" type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- STANDARD VIEW ---
  return (
    <div className="box mb-3">
      <p className="has-text-weight-bold is-size-5">{commentInstance.subject}</p>
      <p className="mt-1">{commentInstance.content}</p>
      <div className="level mt-3">
        <div className="level-left">
          <span className="has-text-grey is-size-7">
            {commentInstance.username} · {commentInstance.publication_date}
          </span>
        </div>
        {isAuthor && (
          <div className="level-right">
            <div className="buttons">
              <button className="button is-warning is-outlined is-small" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="button is-danger is-outlined is-small" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};