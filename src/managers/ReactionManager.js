const API_URL = "http://localhost:8088"

export const createReaction = async (reactionObj) => {
  const res = await fetch(`${API_URL}/reactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(reactionObj),
  });
  return await res.json();
};

export const getAllReactions = async () => {
  const res = await fetch(`${API_URL}/reactions`);
    return await res.json();
};

export const deleteReaction = (reactionId) => {
  return fetch(`http://localhost:8088/reactions/${reactionId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
};

export const editReaction = (reaction) => {
    return fetch(`http://localhost:8088/reactions/${reaction.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(reaction)
    })
}

export const addPostReaction = async (postReactionObj) => {
  const res = await fetch(`${API_URL}/postreactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(postReactionObj)
  });
  return await res.json()
}

export const getReactionsForPost = async (postId) => {
  const res = await fetch(`${API_URL}/postreactions?post_id=${postId}`);
  return await res.json()
}