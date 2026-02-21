import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTag } from "../../managers/tagManager";

const initialTagState = {
  label: "",
};

export const TagForm = () => {
  const navigate = useNavigate();
  const [newTag, setNewTag] = useState(initialTagState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewTag((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newTag.label) {
        alert("Please enter a tag name.");
        return;
    }

    createTag(newTag).then(() => {
        navigate("/tags")
    })
  }

  return (
    <form className="tag-add-form" onSubmit={handleSubmit}>
      <input
        className="tag-input"
        type="text"
        name="label"
        value={newTag.label}
        placeholder="New Tag"
        onChange={handleInputChange}
      />
      <button type="submit" className="tag-input-submit">
        Save
      </button>
    </form>
  );
};