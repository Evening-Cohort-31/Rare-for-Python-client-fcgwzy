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
    <form className="category-add-form" onSubmit={handleSubmit}>
      <input
        className="category-input"
        type="text"
        name="label"
        value={newCategory.label}
        placeholder="NewCategory"
        onChange={handleInputChange}
      />
      <button type="submit" className="category-input-submit">
        Add
      </button>
    </form>
  );
};
