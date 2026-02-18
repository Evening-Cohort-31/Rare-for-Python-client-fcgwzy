export const getAllCategories = () => {
    return fetch(`http://localhost:8088/categories`).then ((res) =>
    res.json())
}

export const createCategory = (categoryObject) => {
    return fetch("http://localhost:8088/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(categoryObject)
    })
    .then((res) => res.json())    
}