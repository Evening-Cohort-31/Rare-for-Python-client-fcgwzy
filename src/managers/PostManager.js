export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    }).then ((res) => res.json())
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
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
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

export const updatePost = (postId, updatedPost) => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(updatedPost)
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

export const approvePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

export const searchPosts = (searchTerm, userId) => {
    return fetch(`http://localhost:8088/posts?search=${searchTerm}&user_id=${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    }).then(res => res.json())
}

export const searchPostsByTag = (tagLabel, userId) => {
    return fetch(`http://localhost:8088/posts?tag=${tagLabel}&user_id=${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}