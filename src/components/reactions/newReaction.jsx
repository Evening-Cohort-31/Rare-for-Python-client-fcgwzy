import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReaction } from "../../managers/ReactionManager";

const initialReactionState = {
    label: "",
    emoji: ""
};

export const ReactionForm = () => {
    const navigate = useNavigate();
    const [ newReaction, setNewReaction ] = useState(initialReactionState);

    useEffect(() => {
        
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setNewReaction((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!newReaction.label || !newReaction.emoji) {
            alert("Please provide both a label and an image URL.");
            return
        }

        createReaction(newReaction).then(() => {
            navigate("/reactions")
        })
    }

    return (
        <section className="section">
            <div className="container">
                <h2 className="title">Create New Reaction</h2>
                <form className="box" onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Reaction Label</label>
                        <div className="control">
                            <input
                                className="input" 
                                type="text"
                                name="label"
                                value={newReaction.label}
                                placeholder="e.g. Heart, Fire, Mind Blown"
                                onChange={handleInputChange}   
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Reaction Image URL</label>
                        <div className="control">
                            <input 
                                className="input"
                                type="text"
                                name="emoji" // Matches the key in initialReactionState
                                placeholder="Paste reaction URL here..."
                                value={newReaction.emoji}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* PREVIEW: Helpful for the user to see the image before saving */}
                    {newReaction.emoji && (
                        <div className="mb-4">
                            <p className="help">Preview:</p>
                            <img src={newReaction.emoji} alt="preview" style={{ maxHeight: "50px" }} />
                        </div>
                    )}

                    <div className="control">
                        <button type="submit" className="button is-success">
                            Save Reaction
                        </button>
                        <button 
                            type="button" 
                            className="button is-light ml-2"
                            onClick={() => navigate("/reactions")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}