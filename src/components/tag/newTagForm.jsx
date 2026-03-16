import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTag } from "../../managers/tagManager";


const initialTagState = {
  label: "",
};

export const TagForm = ({ refreshTags }) => { // Added refreshTags prop in case you want to update the list without a redirect
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
        setNewTag(initialTagState)
        if (refreshTags) {
            refreshTags() 
        } else {
            navigate("/tags")
        }
    })
  }

  return (
    <div className="box">
      <h3 className="subtitle">Create Tag</h3>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              name="label"
              value={newTag.label}
              placeholder="New Tag Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="control">
            <button type="submit" className="button is-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};