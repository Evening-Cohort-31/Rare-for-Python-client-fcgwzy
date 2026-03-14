import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteReaction,
  getAllReactions,
} from "../../managers/ReactionManager";

export const ReactionList = () => {
  const navigate = useNavigate();
  const [reactions, setReactions] = useState([]);

  const isAdmin = localStorage.getItem("is_admin") === "1";

  useEffect(() => {
    getAllReactions().then((reactionData) => {
      setReactions(reactionData);
    });
  }, []);

  const reactionForm = () => {
    navigate("/newreaction");
  };

  const handleDelete = (reactionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tag?",
    );

    if (confirmDelete) {
      deleteReaction(reactionId).then(() => {
        getAllReactions().then(setReactions);
      });
    }
  };

  const handleEditReaction = (reactionId) => {
    navigate(`/edit-reaction/${reactionId}`);
  };

  return (
    <div className="reactions-container">
      <h2 className="title">Reactions</h2>
      <div className="reactions-list">
        {reactions.map((reaction) => {
          return (
            <section key={`reaction--${reaction.id}`} className="reaction box mb-3">
              <div className="is-flex is-align-items-center">
                {/* 1. Display the Emoji and Label once per reaction */}
                <div className="mr-4" style={{ fontSize: "2rem" }}>
                  {reaction.emoji}
                </div>
                <div className="reaction-label title is-5 mb-0">
                  {reaction.label}
                </div>

                {/* 2. Display Admin Buttons once per reaction */}
                <div className="ml-auto">
                  {isAdmin && (
                    <>
                      <button 
                        className="button is-small is-warning mr-2"
                        onClick={() => handleEditReaction(reaction.id)}
                      >
                        Edit
                      </button>
                      <button 
                        className="button is-small is-danger"
                        onClick={() => handleDelete(reaction.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
      <button className="button is-primary mt-4" onClick={reactionForm}>
        Create New Reaction
      </button>
    </div>
  );
};
