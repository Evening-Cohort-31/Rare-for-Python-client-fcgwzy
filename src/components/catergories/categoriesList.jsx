// Import the CSS


// All other imports:
import { useNavigate } from "react-router-dom"

export const CategoryList = () => {
    const navigate = useNavigate();

    const categoryForm = () => {
        navigate("/newcategory")
    }
    return (
        <>
            <div>This will be the list of categories</div>
            <button onClick={categoryForm}>Create Category</button>
        </>
    )
}