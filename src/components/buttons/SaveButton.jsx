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

export const UpdateButton = ({ onClick }) => {

  const handleUpdate = async (e) => {
    await onClick(e);

  };
  return (
    <>
      <button className="save-btn round-btn" onClick={handleUpdate}>
        Update
      </button>
    </>
  );
};