import "./button.css";


export const EditButton = ({onClick}) => {

  return (
    <>
        <button className="edit-btn"
        onClick={onClick}
        >Edit</button>
    </>
  );
};