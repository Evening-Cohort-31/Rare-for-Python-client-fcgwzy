// import "./Post.css"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../managers/CategoryManager";

const initialCategoryState = {
  label: "",
};

export const CategoryForm = () => {
  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState(initialCategoryState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newCategory.label) {
        alert("Please enter a category name.");
        return;
    }

    createCategory(newCategory).then(() => {
        navigate("/categories")
    })
  }


return (
    <div className="box">
      <h2 className="title is-4">Create Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Category Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="label"
              value={newCategory.label}
              placeholder="e.g. Technology"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button type="submit" className="button is-primary">
              Add Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};