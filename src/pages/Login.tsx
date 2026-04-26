import {Link} from "react-router-dom"
import { LoginSignupWidget } from "../components/LoginSignupWidget"

export const Login = () => {
  return (
    <div>
      <h1>Login 💚</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/SignUp">Sign Up</Link>
      <br />
      <LoginSignupWidget mode={"Login"}/>
    </div>
  )
}