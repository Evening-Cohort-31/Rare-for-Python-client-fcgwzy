import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { deleteTag, getAllTags } from "../../managers/tagManager";

export const TagList = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

    const isAdmin = localStorage.getItem("is_admin") === "1"

    useEffect(() => {
        getAllTags().then((tagData) => {
            const sortedTags = tagData.sort((a, b) => a.label.localeCompare(b.label))
            setTags(sortedTags)
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
        <section className="section">
            <div className="container">
                <div className="level">
                    <div className="level-left">
                        <h2 className="title">Tags</h2>
                    </div>
                    <div className="level-right">
                        <button className="button is-info" onClick={tagForm}>
                            Create Tag
                        </button>
                    </div>
                </div>

                <div className="box">
                    <table className="table is-fullwidth is-striped is-hoverable">
                        <thead>
                            <tr>
                                <th>Label</th>
                                {isAdmin && <th className="has-text-right">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {tags.map(tag => (
                                <tr key={`tag${tag.id}`}>
                                    <td className="is-vcentered">
                                        <span className="is-size-5">{tag.label}</span>
                                    </td>
                                    {isAdmin && (
                                        <td className="has-text-right">
                                            <div className="buttons is-right">
                                                <button 
                                                    className="button is-small is-link is-outlined" 
                                                    onClick={() => handleEditTag(tag.id)}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className="button is-small is-danger is-outlined" 
                                                    onClick={() => handleDelete(tag.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}