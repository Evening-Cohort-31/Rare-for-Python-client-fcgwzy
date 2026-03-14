import "./button.css";

export const CancelButton = ({ onClick }) => {
  return (
    <button className="button is-white is-rounded" onClick={onClick}>
      Cancel
    </button>
  );
};
