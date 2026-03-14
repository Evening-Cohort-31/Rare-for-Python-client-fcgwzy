import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editReaction, getAllReactions } from "../../managers/ReactionManager";

export const EditReactionForm = () => {
  const { reactionId } = useParams();
  const navigate = useNavigate();

  const [reaction, setReaction] = useState({ label: "", emoji: "" });

  useEffect(() => {
    getAllReactions().then((reactions) => {
      const foundReactionToEdit = reactions.find(
        (r) => r.id === parseInt(reactionId),
      );
      if (foundReactionToEdit) {
        setReaction(foundReactionToEdit);
      }
    });
  }, [reactionId]);

  const handleSave = (e) => {
    e.preventDefault();

    editReaction({
      id: parseInt(reactionId),
      label: reaction.label,
      emoji: reaction.emoji,
    }).then(() => {
      navigate("/reactions");
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSave}>
      <h2>Edit Reaction</h2>

      <input
        type="text"
        value={reaction.label}
        onChange={(e) =>
          setReaction({
            ...reaction,
            label: e.target.value,
          })
        }
      />
      <input
        type="text"
        value={reaction.emoji}
        onChange={(e) =>
          setReaction({
            ...reaction,
            emoji: e.target.value,
          })
        }
      />

      <button type="submit">Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
};
