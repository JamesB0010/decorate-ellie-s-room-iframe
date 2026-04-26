import {Link} from "react-router-dom"
import { LoginSignupWidget } from "../components/LoginSignupWidget"
import {useCallback, type SubmitEvent} from "react"
import {game} from "../index"

export const Login = () => {

  const loginSubmit = useCallback((event: SubmitEvent<HTMLFormElement>) =>{
    game.start();
  }, []);

  return (
    <div>
      <h1>Login 💚</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/SignUp">Sign Up</Link>
      <br />
      <LoginSignupWidget mode={"Login"} onSubmit={loginSubmit}/>
    </div>
  )
}