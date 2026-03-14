import { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "../../managers/userManager";
import { useNavigate } from "react-router-dom";

export const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getAndSetUsers = () => {
    getAllUsers().then((usersArray) => {
      const sorted = [...usersArray].sort((a, b) =>
        a.username.localeCompare(b.username),
      );
      setUsers(sorted);
    });
  };

  useEffect(() => {
    if (token) {
      getAndSetUsers();
    }
  }, [token]);

  const handleToggleActive = async (user) => {
    const userId = user.id;

    if (!userId) {
      console.error("Could not find an ID for this user!", user);
      return;
    }

    const action = user.active ? "deactivate" : "activate";
    const confirmed = window.confirm(
      `Are you sure you want to ${action} this user's profile?`,
    );

    if (confirmed) {
      const updatedUser = {
        ...user,
        active: user.active ? 0 : 1,
      };

      const response = await updateUser(userId, updatedUser);

      if (response.ok || response.status === 204) {
        getAndSetUsers();
      } else {
        console.error("Failed to update user status");
      }
    }
  };

  return (
    <div className="my-profile-container">
      <h2 className="title is-4 has-text-centered">User Profiles</h2>

      {users.length === 0 ? (
        <p className="has-text-centered">No users found.</p>
      ) : (
        <div className="columns is-multiline">
          {users.map((user) => (
            <div key={user.id} className="column is-one-third">
              <div className={`card ${!user.active ? "has-background-light" : ""}`}>

                {/* Card Header */}
                <div className="card-header">
                  <p
                    className="card-header-title"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    {user.username}
                  </p>
                  <span className={`tag mt-3 mr-3 is-rounded ${user.is_admin ? "is-success" : "is-info"}`}>
                    {user.is_admin ? "Admin" : "Author"}
                  </span>
                </div>

                {/* Card Content */}
                <div
                  className="card-content has-text-centered"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  <img
                    src={user.profile_image_url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="card-avatar"
                  />
                  <p>
                    <strong>Name: </strong>
                    {user.first_name} {user.last_name}
                  </p>
                  <p>
                    <strong>Status: </strong>
                    {user.active ? "Active" : "Deactivated"}
                  </p>
                </div>

                {/* Card Footer with buttons */}
                <div className="card-footer">
                  <button
                    className="button is-warning is-small is-rounded card-footer-item"
                    onClick={() => navigate(`/users/${user.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className={`button is-small is-rounded card-footer-item ${user.active ? "is-danger" : "is-info"}`}
                    onClick={() => handleToggleActive(user)}
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};