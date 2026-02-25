import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllTags } from "../../managers/tagManager"
import { getPostById, updatePostTags } from "../../managers/PostManager"



export const ManageTags = () => {
    const { post_id } = useParams()
    const navigate = useNavigate()

    const [allTags, setAllTags] = useState([])
    const [selectedTagIds, setSelectedTagIds] = useState([])

    useEffect(() => {
        getAllTags().then(setAllTags)

        getPostById(post_id).then(post => {
            const tagIds = post.tags?.map(tag => tag.id) || []
            setSelectedTagIds(tagIds)
        })
    }, [post_id])

    const handleCheckboxChange = (tagId) => {
        if (selectedTagIds.includes(tagId)) {
            setSelectedTagIds(selectedTagIds.filter(id => id !== tagId))
        } else {
            setSelectedTagIds([...selectedTagIds, tagId])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        updatePostTags(post_id, selectedTagIds).then(() => navigate(`/posts/${post_id}`))
    }

    return <div>
                <section>
                    <h2>Tags</h2>

                    <form onSubmit={handleSubmit}>
                        {allTags.map(tag => (
                            <div key={tag.id}>
                                <label>
                                    <input
                                        type = "checkbox"
                                        checked={selectedTagIds.includes(tag.id)}
                                        onChange={() => handleCheckboxChange(tag.id)}
                                    />
                                    {tag.label}
                                </label>
                            </div>
                        ))}

                        <button type="submit">Save</button>
                    </form>

                </section>
    </div>
}