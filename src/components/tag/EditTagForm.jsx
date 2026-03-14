import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editTag, getAllTags } from "../../managers/tagManager"


export const EditTagForm = () => {
    const {tagId} = useParams()
    const navigate = useNavigate()

    const [tag, setTag] = useState({label: ""})

    useEffect(() => {
        getAllTags().then(tags => {
            const foundTagToEdit = tags.find(t => t.id === parseInt(tagId))
            if (foundTagToEdit) {
                setTag(foundTagToEdit)
            }
        })
    }, [tagId])

    const handleSave = (e) => {
        e.preventDefault()

        editTag({
            id: parseInt(tagId),
            label: tag.label
        }).then(() => {
            navigate("/tags")
        })
    }

    const handleCancel = () => {
        navigate(-1)
    }

    return (
        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <form className="box" onSubmit={handleSave}>
                            <h2 className="title">Edit Tag</h2>

                            <div className="field">
                                <label className="label">Tag Name</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        value={tag.label}
                                        onChange={(e) => setTag({ 
                                                            ...tag, 
                                                            label: e.target.value})
                                        }
                                        placeholder="Enter tag name..."
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <button type="submit" className="button is-info">
                                        Save
                                    </button>
                                </div>
                                <div className="control">
                                    <button 
                                        type="button" 
                                        className="button is-light" 
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}