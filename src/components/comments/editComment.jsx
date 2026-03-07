import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SaveButton } from "../buttons/saveButton.jsx"
import { getCommentById, updateComment } from "../../managers/CommentManager.js";

export const EditComment = () => {
    const { comment_id } = useParams()
    const navigate = useNavigate()
    
    const [commentToEdit, setCommentToEdit] = useState({
        subject: "",
        content: "",
        post_id: 0,
        author_id: 0
    })

    useEffect(() => {
        getCommentById(comment_id).then((data) => {
            setCommentToEdit(data)
        })
    }, [comment_id])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setCommentToEdit({
            ...commentToEdit,
            [name]: value
        })
    }

    const handleSave = (e) => {
        e.preventDefault()

        updateComment(commentToEdit).then(() => {
            // After saving, navigate back to the post details where the comment lived
            navigate(`/posts/${commentToEdit.post_id}`)
        })
    }

    return (
        <form className="comment-edit-form" onSubmit={handleSave}>
            <h2>Edit Comment</h2>
            <fieldset>
                <label>Subject:</label>
                <input
                    type="text"
                    name="subject"
                    value={commentToEdit.subject}
                    onChange={handleInputChange}
                    required
                />
            </fieldset>
            <fieldset>
                <label>Content:</label>
                <textarea
                    name="content"
                    value={commentToEdit.content}
                    onChange={handleInputChange}
                    required
                />
            </fieldset>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => navigate(-1)}>Cancel</button>
        </form>
    )
}

// Still need to add the data to populate the edit form 