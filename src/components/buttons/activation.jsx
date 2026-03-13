import "./button.css";

export const DeactivationButton = ({ onClick, user }) => {
    if (!user) return null;
  return (
    <button
    className={user.active ? "btn--deactivate" : "btn-activate"}
    onClick={onClick}>
      {user.active ? "Deactivate" : "Activate"}
    </button>
  );
};
