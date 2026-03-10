import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserById, updateUserAvatar } from "../../managers/userManager"
import "./MyProfile.css"

export const MyProfile = ({ token }) => {
    const [user, setUser] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            getUserById(token).then(userData => {
                setUser(userData)
                setAvatarUrl(userData.profile_image_url || "")
            })
        }
    }, [token])

    const handleSave = () => {
        updateUserAvatar(token, avatarUrl).then(() => {
            setUser({ ...user, profile_image_url: avatarUrl })
        })
    }

    if (!user) return <p>Loading...</p>

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const month = date.getMonth() + 1
        const day = date.getDate()
        const year = date.getFullYear()
        return `${month}/${day}/${year}`
    }

    return (
        <div className="my-profile-container">
            <h2>My Profile</h2>

            <img
                src={user.profile_image_url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                alt="avatar"
                className="profile-avatar"
            />

            <div>
                <p><strong>Full Name:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Display Name:</strong> @{user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Member Since:</strong> {formatDate(user.created_on)}</p>
                <p><strong>Account Type:</strong> {user.is_admin ? "Admin" : "Author"}</p>
            </div>

            <div>
                <h3>Update Avatar</h3>
                <input
                    type="text"
                    placeholder="Paste image URL here..."
                    value={avatarUrl}
                    onChange={(event) => setAvatarUrl(event.target.value)}
                />
                <button onClick={handleSave}>Save Avatar</button>
            </div>
        </div>
    )
}