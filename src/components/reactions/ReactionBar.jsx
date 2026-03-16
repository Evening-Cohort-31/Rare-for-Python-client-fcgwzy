import { useState, useEffect } from "react";
import {
  addPostReaction,
  getReactionsForPost, // This is the only one you need!
} from "../../managers/ReactionManager";

export const ReactionBar = ({ post_id }) => {
  const [reactions, setReactions] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (post_id) {
      // This gets the emojis AND the counts in one go
      getReactionsForPost(post_id).then(setReactions);
    }
  }, [refreshTrigger, post_id]);

  const handleReactionClick = (reactionId) => {
    const newReaction = {
      post_id: parseInt(post_id),
      reaction_id: reactionId,
    };

    addPostReaction(newReaction).then(() => {
      // This triggers the useEffect above to fetch the NEW counts
      setRefreshTrigger((prev) => prev + 1);
    });
  };

  return (
    <div className="reactions-container" style={{ marginTop: "10px" }}>
      <div className="reaction-buttons" style={{ display: "flex", gap: "12px" }}>
        {reactions.map((reaction) => (
          <button
            key={reaction.id}
            className="reaction-button"
            title={reaction.label}
            onClick={() => handleReactionClick(reaction.id)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px 12px",
              borderRadius: "20px",
              border: "1px solid #dbdbdb",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>{reaction.emoji}</span>

            {/* If count is 0, this span won't even render */}
            {reaction.count > 0 && (
              <span className="ml-2" style={{ fontWeight: "bold" }}>
                {reaction.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};