import { useState } from "react";
import { deleteComment, updateComment } from "../../managers/CommentManager";
import { DeleteButton } from "../buttons/deleteButton.jsx";

export const Comment = ({ commentInstance, onUpdateSuccess }) => {
  const [currentUser] = useState(localStorage.getItem("auth_token"));

  const [isEditing, setIsEditing] = useState(false);

  const [editValue, setEditValue] = useState({
    subject: commentInstance.subject,
    content: commentInstance.content,
  });

  const commentAuthorId = Number(currentUser);
  const authorId = Number(commentInstance?.author_id);

  // Now this comparison will find a match (e.g., 1 === 1)
  const isAuthor = commentAuthorId !== 0 && commentAuthorId === authorId;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValue({ ...editValue, [name]: value });
  };

const handleSave = async (e) => {
    e.preventDefault();

    const commentToSend = {
      id: commentInstance.id,
      post_id: commentInstance.post_id,
      author_id: commentInstance.author_id,
      publication_date: commentInstance.publication_date,
      subject: editValue.subject,
      content: editValue.content
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

    if(confirmed) {
        const response = await deleteComment(commentInstance.id);

        if (response.ok) {
            onUpdateSuccess();
        } else {
            alert("Failed to delete the comment.")
        }
    }
  }

  // --- EDITING VIEW ---
  if (isEditing) {
    return (
      <form className="comment-edit-form" onSubmit={handleSave}>
        <fieldset>
          <label>Subject:</label>
          <input
            name="subject"
            value={editValue.subject}
            onChange={handleInputChange}
            required
          />
        </fieldset>
        <fieldset>
          <label>Content:</label>
          <textarea
            name="content"
            value={editValue.content}
            onChange={handleInputChange}
            required
          />
        </fieldset>
        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
        <hr />
      </form>
    );
  }

  // --- STANDARD VIEW ---
  return (
    <div className="comment-details">
      <div className="comment-subject">{commentInstance.subject}</div>
      <div className="comment-content">{commentInstance.content}</div>
      <div className="user_details">
        <div className="username">{commentInstance.username}</div>
        <span>{commentInstance.publication_date}</span>
      </div>
      {isAuthor && (
        <div className="author-controls">
          {/* Trigger the edit form */}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <DeleteButton onClick={handleDelete}/>
        </div>
      )}
      <hr />
    </div>
  );
};
