import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"

export const Login = ({ setToken }) => {
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setIsUnsuccessful] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value    }

    loginUser(user).then(res => {
      console.log("Login Response:", res)
      if (res.valid && (res.active == 1 || res.active === true || res.active === "1")) {
        setToken(res.token)
        localStorage.setItem("auth_token", res.token)
        localStorage.setItem("is_admin", res.is_admin)
        navigate("/")
      } else if (res.valid && (res.active === 0 || res.active === false || res.active === "0")){
        alert("Your account has been deactivated. Please contact an admin to repeal.")
        setIsUnsuccessful(true)
      }
      else {
        setIsUnsuccessful(true)
      }
    })
  }

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleLogin}>
        <h1 className="title">Rare Publishing</h1>
        <p className="subtitle">Please sign in</p>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" ref={password} />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit" >Submit</button>
          </div>
          <div className="control">
            <Link to="/register" className="button is-link is-light">Cancel</Link>
          </div>
        </div>
        {
          isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
        }
      </form>
    </section>
  )
}
