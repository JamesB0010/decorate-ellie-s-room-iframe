import {Link} from "react-router-dom"

export const HomePage = () => {
  return (
    <div>
      <h1>Home Page 💚</h1>
      <Link to="/Login">Login</Link>
      <br />
      <Link to="SignUp">Sign Up</Link>
    </div>
  )
}