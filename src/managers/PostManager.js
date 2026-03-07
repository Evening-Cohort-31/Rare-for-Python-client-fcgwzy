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

export const updatePostTags = (postId, tagIds) => {
    return fetch (`http://localhost:8088/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            tag_ids: tagIds
        })
    })
}

export const updatePost = (postObj) => {
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj)
  })
}

export const getSubscribedPosts = (followerId) => {
    return fetch(`http://localhost:8088/posts?follower_id=${followerId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
}