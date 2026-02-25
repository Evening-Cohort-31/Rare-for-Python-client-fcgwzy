export const getAllComments = () => {
    return fetch(`http://localhost:8088/comments`).then ((res) =>
    res.json())
}

export const createComment = (commentObj) => {
    return fetch("http://localhost:8088/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(commentObj)
    })
    .then((res) => res.json())    
}