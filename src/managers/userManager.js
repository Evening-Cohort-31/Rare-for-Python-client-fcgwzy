const Url = "http://localhost:8088"

export const getAllUsers = () => {
    return fetch(`${Url}/users`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const getUserById = (userId) => {
    return fetch(`${Url}/users/${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
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