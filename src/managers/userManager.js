const Url = "http://localhost:8088"

export const getAllUsers = () => {
    return fetch(`${Url}/users`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const getUserById = async (userId) => {
    const res = await fetch(`${Url}/users/${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    return await res.json()
}

export const updateUser = (userId, userObj) => {
    return fetch(`${Url}/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(userObj)
    })
}

export const updateUserAvatar = (userId, avatarUrl) => {
    return fetch(`${Url}/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify({ profile_image_url: avatarUrl })
    })
}