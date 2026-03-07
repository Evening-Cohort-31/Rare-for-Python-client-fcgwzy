export const getAllComments = () => {
    return fetch(`http://localhost:8088/comments`).then ((res) =>
    res.json())
}

export const getAllCommentsForPost = (post_id) => {
    return fetch(`http://localhost:8088/comments?post_id=${post_id}`).then ((res) =>
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

export const getCommentById = (id) => {
    return fetch(`http://localhost:8088/comments/${id}`).then(res => res.json())
}

export const updateComment = (comment) => {
    return fetch(`http://localhost:8088/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
}