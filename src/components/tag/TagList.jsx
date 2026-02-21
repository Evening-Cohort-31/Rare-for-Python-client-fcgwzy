import { useNavigate } from "react-router-dom"

export const TagList = () => {
    const navigate = useNavigate();

    const tagForm = () => {
        navigate("/newtag")
    }
    
    return (
        <>
            <div>This will be the list of tags</div>
            <button onClick={tagForm}>Create Tag</button>
        </>
    )
}