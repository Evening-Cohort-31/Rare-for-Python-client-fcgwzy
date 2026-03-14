import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById, updateUser } from "../../managers/userManager"
import { SaveButton } from "../buttons/SaveButton.jsx"
import { CancelButton } from "../buttons/CancelButton.jsx"

export const UserEditForm = () => {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getUserById(userId).then(setUser)
    }, [userId])

    const handleSave = () => {
        updateUser(userId, user).then(() => {
            navigate("/users")
        })
    }

    if (!user) return <p>Loading...</p>

    return (
        <div className="my-profile-container">
            <h2 className="title is-4 has-text-centered">
                Edit User Type for {user.first_name} {user.last_name}
            </h2>

            <div className="columns is-centered">
                <div className="column is-one-third">
                    <div className="box">
                        <div className="field">
                            <label className="label">User Type</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        value={user.is_admin}
                                        onChange={(event) => setUser({ ...user, is_admin: parseInt(event.target.value) })}
                                    >
                                        <option value={0}>Author</option>
                                        <option value={1}>Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="buttons is-centered mt-4">
                            <SaveButton onClick={handleSave} />
                            <CancelButton onClick={() => navigate("/users")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}