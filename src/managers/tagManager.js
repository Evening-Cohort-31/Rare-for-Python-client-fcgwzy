export const getAllTags = () => {
    return fetch(`http://localhost:8088/tags`).then((res) =>
        res.json())
}

export const createTag = (tagObject) => {
    return fetch("http://localhost:8088/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(tagObject)
    })
    .then((res) => res.json())    
}

export const deleteTag = (tagId) => {
    return fetch(`http://localhost:8088/tags/${tagId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

export const editTag = (tag) => {
    return fetch(`http://localhost:8088/tags/${tag.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(tag)
    })
}