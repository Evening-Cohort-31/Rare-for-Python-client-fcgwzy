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
        <button className="button is-small is-link is-outlined"
        onClick={handleEdit}
        disabled={disabled}
        >Edit</button>
    </>
  );
};