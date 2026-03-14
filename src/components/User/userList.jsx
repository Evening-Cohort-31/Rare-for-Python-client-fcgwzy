import { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "../../managers/userManager";
import { useNavigate } from "react-router-dom";
import { EditButton } from "../buttons/editButton.jsx";
import { DeactivationButton } from "../buttons/activation.jsx";

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
    <div className="users-container">
      <h2 className="users-header">User Profiles</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="users-list">
          {users.map((user) => (
            <div
              key={user.id}
              className={`user-item ${!user.active ? "deactivated" : ""}`}
            >
              <span
                className="user-name"
                onClick={() => navigate(`/users/${user.id}`)}
              >
                {user.username}
              </span>
              <span
                className="user-username"
                onClick={() => navigate(`/users/${user.id}`)}
              >
                ... {user.first_name} {user.last_name}
              </span>
              <span
                className="user-type"
                onClick={() => navigate(`/users/${user.id}`)}
              >
                {user.is_admin ? " Admin" : " Author"}
              </span>

              <div className="user-controls">
                <EditButton route={`/users/${user.id}/edit`} />
                <DeactivationButton
                  user={user}
                  onClick={() => handleToggleActive(user)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
