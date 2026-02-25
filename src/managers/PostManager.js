export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts`).then ((res) =>
    res.json())
}

export const getPostById = (id) => {
  return fetch(`http://localhost:8088/posts/${id}`).then((res) => 
  res.json()
)
}

export const createPost = (postObject) => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(postObject)
    })
    .then((res) => res.json())
}

export const getPostsByUserId = (user_id) => {
    return fetch(`http://localhost:8088/posts?user_id=${user_id}`)
        .then(res => res.json());
}

export const deletePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE" 
    });
};