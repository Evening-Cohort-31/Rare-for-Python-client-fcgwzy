import { useEffect, useState } from "react"
import { getAllCommentsForPost } from "../../managers/CommentManager"
import { useParams } from "react-router-dom";
import { EditButton } from "../buttons/EditButton.jsx"
import { DeleteButton } from "../buttons/DeleteButton.jsx"

export const Comment = ({commentInstance}) => {
    const [currentUser] = useState(localStorage.getItem("auth-token"))

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
                        <EditButton/>
                        <DeleteButton/>
                    </div>
                )}
                <hr/>
            </div>
        </div>
    )
}