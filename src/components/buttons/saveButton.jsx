import "./button.css";

export const SaveButton = ({ onClick }) => {
  return (
    <button className="button is-success is-rounded" onClick={onClick}>
      Save
    </button>
  );
};

export const UpdateButton = ({ onClick }) => {
  const handleUpdate = async (e) => {
    await onClick(e);
  };
  return (
    <button className="button is-success is-rounded" onClick={handleUpdate}>
      Update
    </button>
  );
};