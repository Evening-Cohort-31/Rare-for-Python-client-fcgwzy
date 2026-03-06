import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { deleteTag, getAllTags } from "../../managers/tagManager";

export const TagList = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

    const isAdmin = localStorage.getItem("is_admin") === "1"

        useEffect(() => {
            getAllTags().then((tagData) => {
                setTags(tagData)
            })
        }, [])

    const tagForm = () => {
        navigate("/newtag")
    }

    const handleDelete = (tagId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tag?")

        if (confirmDelete) {
            deleteTag(tagId).then(() => {
                getAllTags().then(setTags)
            })
        }
    }

    const handleEditTag = (tagId) => {
        navigate(`/edit-tag/${tagId}`)
    }
    
    return (
        <div className="tags-container">
            <h2>Tags</h2>
                <div className="tags-list">
                        {
                            
                            tags.map(tag => {
                                return <section key={`tag${tag.id}`} className="tag">
                                    {isAdmin && (
                                        <button onClick={() => handleEditTag(tag.id)}>Edit</button>
                                    )}
                                    {isAdmin && (
                                        <button onClick={() => handleDelete(tag.id)}>Delete</button>
                                    )}
                                    <div className="tag-label">{tag.label}</div>
                                </section>
                            })
                        }
                </div>
            <button onClick={tagForm}>Create Tag</button>
            
        </div>
    )
}

