import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate()
  const navbar = useRef()
  const hamburger = useRef()

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  const isAdmin = localStorage.getItem("is_admin") === "1"

  return (
    <nav className="navbar is-dark mb-3" role="navigation" aria-label="main navigation">
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
              <Link to="/" className="navbar-item has-text-white">Posts</Link>
              <Link to="/posts/new" className="navbar-item has-text-white">Add Post</Link>
              <Link to="/myposts" className="navbar-item has-text-white">My Posts</Link>
              <Link to="/subscribed" className="navbar-item has-text-white">Subscribed</Link>
              <Link to="/profile" className="navbar-item has-text-white">My Profile</Link>

              {isAdmin && (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link has-text-white">Manage</a>
                  <div className="navbar-dropdown">
                    <Link to="/categories" className="navbar-item">Categories</Link>
                    <Link to="/tags" className="navbar-item">Tags</Link>
                    <Link to="/reactions" className="navbar-item">Reactions</Link>
                    <hr className="navbar-divider" />
                    <Link to="/users" className="navbar-item">Users</Link>
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
                  className="btn-flip"
                  data-back="Bye!"
                  data-front="Logout"
                  onClick={() => {
                    setToken('')
                    navigate('/login')
                  }}
                />
              ) : (
                <div>
                  <Link
                    to="/register"
                    className="button is-rounded mr-2"
                    style={{ backgroundColor: "#51e2f5", borderColor: "#51e2f5", color: "#333" }}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="button is-rounded"
                    style={{ backgroundColor: "#ffa8b6", borderColor: "#ffa8b6", color: "#333" }}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}