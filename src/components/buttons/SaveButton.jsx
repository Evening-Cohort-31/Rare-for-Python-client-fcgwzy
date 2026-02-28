import "./button.css";

export const SaveButton = ({ onClick }) => {
  return (
    <>
      <button className="save-btn round-btn" onClick={onClick}>
        Save
      </button>
    </>
  );
};