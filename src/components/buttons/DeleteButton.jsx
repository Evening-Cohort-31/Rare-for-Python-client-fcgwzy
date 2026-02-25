import "./button.css";
import { useNavigate } from "react-router-dom";

export const DeleteButton = () => {
  const navigate = useNavigate();

  const deleteConfirmation = () => {
    let text = "Are you sure you want to delete this category?";
    if (confirm(text) == true) {
      navigate("/home");
    }
  };
  return <button className="cancel-btn round-btn" onClick={deleteConfirmation}>Trashcan Icon</button>;
};
