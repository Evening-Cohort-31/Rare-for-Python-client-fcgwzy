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
        <form onSubmit={handleSave}>
            <h2>Edit Tag</h2>

            <input
                type="text"
                value={tag.label}
                onChange={(e) => setTag({ 
                                    ...tag, 
                                    label: e.target.value})
                }
            />

            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>
    )
}