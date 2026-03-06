import { useNavigate, useParams } from "react-router-dom";
import { updateCategory, getCategoryById } from "../../managers/CategoryManager";
import { useEffect, useState } from "react";
import { CancelButton } from "../buttons/cancelButton";



export const EditCategoryForm = () => {
    const [category, setCategory] = useState({ label: "" })
    const [originalCategory, setOriginalCategory] = useState("")


    const navigate = useNavigate()
    const { categoryId } = useParams()

    useEffect(() => {
        getCategoryById(categoryId).then((categoryObj) => {
            setCategory(categoryObj)
            setOriginalCategory(categoryObj.label)
        })
    }, [categoryId])
    
    const handleInputChange = (event) => {
        const stateCopy = { ...category }
        stateCopy[event.target.name] = event.target.value
        setCategory(stateCopy)
    }
    const handleSave = (event) => {
        event.preventDefault()

        const editedCategory = {
                id: category.id,
                label: category.label
            }

            updateCategory(editedCategory).then(() => {
                navigate("/categories")
            })
    }

      return (
    <form className="category-edit-form" onSubmit={handleSave}>
        <h3>Edit {originalCategory} Here: </h3>
      <input
        className="category-input"
        type="text"
        name="label"
        value={category.label}
        placeholder="Edit Category Name"
        onChange={handleInputChange}
      />
      <button type="submit" className="category-input-submit">
        Save
      </button>
      <CancelButton onClick={() => navigate(`/categories/`)} />
      
    </form>
  );
}