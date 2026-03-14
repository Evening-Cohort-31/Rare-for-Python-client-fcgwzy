import "./button.css";

export const DeleteButton = ({ onClick }) => {
  return (
      <button className="delete-btn round-btn" onClick={onClick}>
        Delete
      </button>
    )
};
