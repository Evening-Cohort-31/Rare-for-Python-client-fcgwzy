import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById, updateUser } from "../../managers/userManager"
import { SaveButton } from "../buttons/saveButton.jsx"
import { CancelButton } from "../buttons/cancelButton.jsx"

export const UserEditForm = () => {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getUserById(userId).then(setUser)
    }, [userId])

    const handleSave = async () => {
        try {
            await updateUser(userId, user)
                navigate("/users")
            } catch (err) {
                alert(err.message)
            }            
        }
    

    if (!user) return <p>Loading...</p>

    return (
        <div>
            <h2>Edit User Type for {user.first_name} {user.last_name}</h2>

            <label>User Type</label>
            <select
                value={user.is_admin}
                onChange={(event) => setUser({ ...user, is_admin: parseInt(event.target.value) })}
            >
                <option value={0}>Author</option>
                <option value={1}>Admin</option>
            </select>

            <SaveButton onClick={handleSave} />
            <CancelButton onClick={() => navigate("/-1")} />
        </div>
    )
}