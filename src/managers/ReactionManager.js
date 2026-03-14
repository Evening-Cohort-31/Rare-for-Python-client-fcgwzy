export const createReaction = async (reactionObj) => {
  const res = await fetch("http://localhost:8088/reactions", {
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
  const res = await fetch("http://localhost:8088/reactions");
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
