import "./button.css";

export const DeleteButton = ({ onClick }) => {
  return (
      <button className="button is-small is-danger is-outlined" onClick={onClick}>
        Delete
      </button>
    )
};
