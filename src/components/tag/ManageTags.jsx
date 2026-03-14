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

    return (
        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <nav className="panel is-primary">
                            <p className="panel-heading">
                                Manage Tags
                            </p>
                            
                            <form onSubmit={handleSubmit}>
                                {allTags.map(tag => (
                                    <label key={tag.id} className="panel-block">
                                        <input
                                            type="checkbox"
                                            className="mr-3"
                                            checked={selectedTagIds.includes(tag.id)}
                                            onChange={() => handleCheckboxChange(tag.id)}
                                        />
                                        {tag.label}
                                    </label>
                                ))}

                                <div className="panel-block">
                                    <button 
                                        type="submit" 
                                        className="button is-primary is-fullwidth"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                                <div className="panel-block">
                                    <button 
                                        type="button" 
                                        className="button is-light is-fullwidth"
                                        onClick={() => navigate(`/posts/${post_id}`)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    )
}