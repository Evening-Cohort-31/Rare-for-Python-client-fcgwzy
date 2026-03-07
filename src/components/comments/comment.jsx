import { useState } from "react";
import { EditButton } from "../buttons/editButton";
import { DeleteButton } from "../buttons/deleteButton";

export const Comment = ({ commentInstance }) => {
  const [currentUser] = useState(localStorage.getItem("auth_token"));

  const commentAuthor = Number(currentUser);
  const authorId = Number(commentInstance?.author_id);

  const isAuthor =
    commentAuthor !== 0 && authorId !== 0 && commentAuthor === authorId;

  return (
    <div>
      <div className="comment-details">
        <div className="comment-subject">{commentInstance.subject}</div>
        <div className="comment-content">{commentInstance.content}</div>
        <div className="user_details">
          <div className="username">{commentInstance.username}</div>
          <span>{commentInstance.publication_date}</span>
        </div>
        {isAuthor && (
          <div className="author-controls">
            <EditButton route={`/comments/${commentInstance.id}/edit`} />{" "}
            <DeleteButton />
          </div>
        )}
        <hr />
      </div>
    </div>
  );
};
