import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { deleteReaction, getAllReactions } from "../../managers/ReactionManager";

export const ReactionList = () => {
    const navigate = useNavigate();
    const [reactions, setReactions] = useState([]);

    const isAdmin = localStorage.getItem("is_admin") === "1"

    useEffect(() => {
        getAllReactions().then((reactionData) => {
            setReactions(reactionData)
        })
    }, [])

    const reactionForm = () => {
        navigate("/newreaction")
    }

    const handleDelete = (reactionId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tag?")

        if (confirmDelete) {
            deleteReaction(reactionId).then(() => {
                getAllReactions().then(setReactions)
            })
        }
    }
    
    const handleEditReaction = (reactionId) => {
        navigate(`/edit-reaction/${reactionId}`)
    }

    return (
        <div className="reactions-container">
            <h2>Reactions</h2>
                <div className="reactions-list">
                        {
                            
                            reactions.map(reaction => {
                                return <section key={`reaction${reaction.id}`} className="reaction">
                                    {isAdmin && (
                                        <button onClick={() => handleEditReaction(reaction.id)}>Edit</button>
                                    )}
                                    {isAdmin && (
                                        <button onClick={() => handleDelete(reaction.id)}>Delete</button>
                                    )}
                                    <div className="reaction-label">{reaction.label}</div>
                                </section>
                            })
                        }
                </div>
            <button onClick={reactionForm}>Create Reaction</button>
            
        </div>
    )
}