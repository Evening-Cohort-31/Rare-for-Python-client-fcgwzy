export const getAllCategories = () => {
    return fetch(`http://localhost:8088/categories`).then ((res) =>
    res.json())
}

export const createCategory = (categoryObject) => {
    return fetch("http://localhost:8088/categories", {
        method: "CATEGORY",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(categoryObject)
    })
    .then((res) => res.json())    
}

export const deleteCategory = (categoryId) => {
    return fetch(`http://localhost:8088/categories/${categoryId}`, {
        method: "DELETE" 
    });
};

export const updateCategory = (categoryObject) => {
    return fetch(`http://localhost:8088/categories/${categoryObject.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryObject),
    });
};

export const getCategoryById = (id) => {
  return fetch(`http://localhost:8088/categories/${id}`).then((res) => 
  res.json()
)
}
