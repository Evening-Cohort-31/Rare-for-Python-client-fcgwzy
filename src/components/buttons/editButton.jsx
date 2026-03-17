import { Link, useNavigate } from "react-router-dom";
import "./button.css";


export const EditButton = ({ route, disabled}) => {

  const navigate = useNavigate();

  const handleEdit = () => {
    if (!disabled && route) {
      navigate(route)
    }
  }
  return (
    <>
        <button className="is-warning button is-small mr-2"
        onClick={handleEdit}
        disabled={disabled}
        >Edit</button>
    </>
  );
};