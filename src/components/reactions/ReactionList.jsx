import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteReaction,
  getAllReactions,
} from "../../managers/ReactionManager";
import { EditButton } from "../buttons/editButton";
import { DeleteButton } from "../buttons/deleteButton";

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
    <section className="section">
      <div className="container">
        {/* Header Level - Matches CategoryList */}
        <div className="level">
          <div className="level-left">
            <h2 className="title">Reactions</h2>
          </div>
          <div className="level-right">
            <button onClick={reactionForm} className="button is-info">
              Create Reaction
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="box">
          <table className="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>Reactions</th>
                {isAdmin && <th className="has-text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {reactions.map((reaction) => (
                <tr key={`reaction--${reaction.id}`}>
                  <td className="is-vcentered">
                    <div className="is-flex is-align-items-center">
                      <span className="mr-3" style={{ fontSize: "1.5rem" }}>
                        {reaction.emoji}
                      </span>
                      <span className="is-size-5">{reaction.label}</span>
                    </div>
                  </td>
                  
                  {isAdmin && (
                    <td className="has-text-right">
                      <div className="buttons is-right">
                        <EditButton
                          onClick={() => navigate(`/edit-reaction/${reaction.id}`)}
                        />
                        <DeleteButton
                          onClick={() => handleDelete(reaction.id, reaction.label)}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
          {reactions.length === 0 && (
            <p className="has-text-centered">No reactions found.</p>
          )}
        </div>
      </div>
    </section>
  );
};
