// Import the CSS


// All other imports:
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/CategoryManager";

export const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories().then((categoryData) => {
            setCategories(categoryData)
        })
    }, [])
    
    const categoryForm = () => {
        navigate("/newcategory")
    }
    return (
        <div className="categories-container">
            <h2>Categories</h2>
                <div className="categories-list">
                        {
                            categories.map(category => {
                                return <section key={`category${category.id}`} className="category">
                                    <div className="category-label">{category.label}</div>
                                </section>
                            })
                        }
                </div>
            <button onClick={categoryForm}>Create Category</button>
        </div>
    )
}