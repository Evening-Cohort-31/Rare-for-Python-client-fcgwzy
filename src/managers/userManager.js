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

export const updateUser = async (userId, userObj) => {
    const res = await fetch(`${Url}/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(userObj)
    })

    if (!res.ok) {
        const text = await res.text()
        let message = "Request failed"

        try {
            const data = JSON.parse(text)
            message = 
                data.error || 
                data.message ||
                text ||
                message
                
        } catch {
            message = text || message
        }
        throw new Error(message)        
    }

    return res
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