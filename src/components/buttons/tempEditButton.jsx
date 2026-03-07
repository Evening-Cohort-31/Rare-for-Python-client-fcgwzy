import { Link, useNavigate } from "react-router-dom";
import "./button.css";


export const EditButton = ({disabled}) => {

  const navigate = useNavigate();

  const handleEdit = () => {
    if (!disabled) {
      navigate("/edit_posts")
    }
  }
  return (
    <>
      <Link to={"edit_post"}>
        <button className="edit-btn"
        onClick={handleEdit}
        disabled={disabled}
        >Edit</button>
      </Link>
    </>
  );
};