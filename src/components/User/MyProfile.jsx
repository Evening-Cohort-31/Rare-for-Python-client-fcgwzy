import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUserAvatar } from "../../managers/userManager";
import { getPostsByUserId } from "../../managers/PostManager";
import { getAllSubscriptions } from "../../managers/SubscriptionManager";
import "./MyProfile.css";

export const MyProfile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const navigate = useNavigate();

  const getAndSetSubscriberCount = () => {
    getAllSubscriptions().then((subscriptions) => {
      const mySubscribers = subscriptions.filter(
        (sub) => sub.author_id === parseInt(token),
      );
      setSubscriberCount(mySubscribers.length);
    });
  };

  useEffect(() => {
    if (token) {
      getUserById(token).then((userData) => {
        setUser(userData);
        setAvatarUrl(userData.profile_image_url || "");
      });
      getPostsByUserId(token).then(setUserPosts);
      getAndSetSubscriberCount();
    }
  }, [token]);

  const handleSave = () => {
    updateUserAvatar(token, avatarUrl).then(() => {
      setUser({ ...user, profile_image_url: avatarUrl });
    });
  };

  if (!user) return <p>Loading...</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString.replace(/-/g, "\/"));
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Chicago", // Optional: remove if you want local user time
    });
  };

  return (
    <div className="my-profile-container">
      <h2 className="title is-4 has-text-centered">My Profile</h2>

      {/* CHANGED: wrapped in columns div and split into two column divs */}
      <div className="columns">
        {/* CHANGED: left column - avatar, info, update avatar */}
        <div className="column is-one-third has-text-centered">
          <img
            src={
              user.profile_image_url ||
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }
            alt="avatar"
            className="profile-avatar"
          />

          <div className="box">
            <p>
              <strong>Full Name:</strong> {user.first_name} {user.last_name}
            </p>
            <p>
              <strong>Display Name:</strong> @{user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Member Since:</strong> {formatDate(user.created_on)}
            </p>
            <p>
              <strong>Account Type:</strong>{" "}
              {user.is_admin ? "Admin" : "Author"}
            </p>
            <p>
              <strong>Subscribers:</strong> {subscriberCount}
            </p>
          </div>

          <div className="box">
            <h3 className="title is-6">Update Avatar</h3>
            <input
              className="input mb-2"
              type="text"
              placeholder="Paste image URL here..."
              value={avatarUrl}
              onChange={(event) => setAvatarUrl(event.target.value)}
            />
            <button className="button is-success" onClick={handleSave}>
              Save Avatar
            </button>
          </div>
        </div>

        {/* CHANGED: right column - posts */}
        <div className="column">
          <div className="box">
            <h3 className="title is-5">My Posts</h3>
            {userPosts.length === 0 ? (
              <p>You have no posts yet.</p>
            ) : (
              userPosts.map((post) => (
                <div
                  key={post.post_id}
                  className="my-post-item"
                  onClick={() => navigate(`/posts/${post.post_id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{post.title}</strong>
                  <span> — {formatDate(post.publication_date)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
