import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Logo from "./rare.jpeg";
import { getUserById } from "../../managers/userManager";

export const NavBar = ({ token, setToken }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();

  useEffect(() => {
    if (token) {
      getUserById(token).then(userData => {
        setUser(userData)
      })
    } else {
      setUser(null)
    }
  }, [token])

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

  const isAdmin = localStorage.getItem("is_admin") === "1";

  return (
    <nav
      className="navbar is-dark mb-3"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} height="30px" alt="Rare Logo" />
          <h1 className="title is-5 ml-2 has-text-white">Rare Publishing</h1>
        </a>

        <div
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {token && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to="/" className="navbar-item has-text-white">
                Posts
              </Link>
              <Link to="/posts/new" className="navbar-item has-text-white">
                Add Post
              </Link>
              <Link to="/myposts" className="navbar-item has-text-white">
                My Posts
              </Link>
              <Link to="/subscribed" className="navbar-item has-text-white">
                Subscribed
              </Link>
              <Link to="/profile" className="navbar-item has-text-white">
                My Profile
              </Link>

              {isAdmin && (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link has-text-white">Manage</a>
                  <div className="navbar-dropdown">
                    <Link to="/categories" className="navbar-item">
                      Categories
                    </Link>
                    <Link to="/tags" className="navbar-item">
                      Tags
                    </Link>
                    <Link to="/reactions" className="navbar-item">
                      Reactions
                    </Link>
                    <hr className="navbar-divider" />
                    <Link to="/users" className="navbar-item">
                      Users
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {token ? (
                <button
                  className="btn-flip is-size-6"
                  data-back="Bye!"
                  data-front={`Logout, ${user?.first_name || 'User'}`}
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                  }}
                />
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="btn-flip register-btn"
                    data-back="Join Us!"
                    data-front="Register"
                    onClick={() => navigate("/register")}
                  />
                  <button
                    className="btn-flip"
                    data-back="Welcome!"
                    data-front="Login"
                    onClick={() => navigate("/login")}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
