export const createSubscription = (subscriptionObject) => {
    return fetch("http://localhost:8088/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify(subscriptionObject)
    })
    .then((res) => res.json())
}

export const getAllSubscriptions = () => {
    return fetch(`http://localhost:8088/subscriptions`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    }).then((res) => res.json())
}

export const unsubscribe = (subscriptionId) => {
    return fetch(`http://localhost:8088/subscriptions/${subscriptionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}