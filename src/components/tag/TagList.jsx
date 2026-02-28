import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { getAllTags } from "../../managers/tagManager";

export const TagList = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

        useEffect(() => {
            getAllTags().then((tagData) => {
                setTags(tagData)
            })
        }, [])

    const tagForm = () => {
        navigate("/newtag")
    }
    
    return (
        <div className="tags-container">
            <h2>Tags</h2>
                <div className="tags-list">
                        {
                            
                            tags.map(tag => {
                                return <section key={`tag${tag.id}`} className="tag">
                                    <div className="tag-label">{tag.label}</div>
                                </section>
                            })
                        }
                </div>
            <button onClick={tagForm}>Create Tag</button>
        </div>
    )
}

