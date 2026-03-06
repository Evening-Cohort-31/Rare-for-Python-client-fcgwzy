const Url = "http://localhost:8088"

export const getAllUsers = () => {
    return fetch(`${Url}/users`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}

export const getUserById = (userId) => {
    return fetch(`${Url}/users/${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
        .then(res => res.json())
}