// Import the CSS


// All other imports:
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllCategories, deleteCategory } from "../../managers/CategoryManager";
import { DeleteButton } from "../buttons/deleteButton";
import { EditButton } from "../buttons/editButton";

const initialCategoryState = {
    id: 0,
    label: ""
}

export const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [refreshLabels, setRefreshLabels] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories().then((categoryData) => {
            setCategories(categoryData)
        })
    }, [refreshLabels])
    
    const categoryForm = () => {
        navigate("/newcategory")
    }

    const handleDelete = async (categoryId, categoryLabel) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete the "${categoryLabel}" category?`
        )

        if(!confirmed) return;

        try {
            await deleteCategory(categoryId);

            setRefreshLabels((prev) => prev + 1)
        } catch (error) {
            console.error("Failed to delete category", error);
        }
    };
    return (
        <div className="categories-container">
            <h2>Categories</h2>
                <div className="categories-list">
                        {
                            
                            categories.map(category => {
                                return <section key={`category${category.id}`} className="category">
                                    <div className="category-label">{category.label}</div>
                                    <EditButton onClick={() => navigate(`/categories/${category.id}/edit`)} />
                                    <DeleteButton onClick={() => handleDelete(category.id, category.label)} />
                                </section>
                            })
                        }
                </div>
            <button onClick={categoryForm}>Create Category</button>
        </div>
    )
}