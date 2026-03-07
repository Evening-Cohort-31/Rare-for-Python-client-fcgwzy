import "./button.css";

export const DeleteButton = ({ onClick }) => {
  const handleDelete = async (e) => {
    await onClick(e);
  };
  return (
    <button className="cancel-btn" onClick={handleDelete}>
      Delete
    </button>
  );
};
