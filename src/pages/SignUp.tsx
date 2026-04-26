import {Link} from "react-router-dom"
import { LoginSignupWidget } from "../components/LoginSignupWidget"

export const SignUp = () => {
  return (
    <div>
      <h1>SignUp 💚</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/Login">Log in</Link>
      <br />
      <LoginSignupWidget mode="SignUp" />
    </div>
  )
}