import {Link} from "react-router-dom"
import { LoginSignupWidget } from "../components/LoginSignupWidget"
import {useCallback, type SubmitEvent} from "react"
import {game} from "../index"
import {useNavigate} from "react-router-dom"
import {localStorageManager} from "../LocalStorageManager"

export const Login = () => {
  const navigate = useNavigate();

  const loginSubmit = useCallback((event: SubmitEvent<HTMLFormElement>) =>{
    localStorageManager.loggedIn = true;
    game.start();
    navigate("/Game");
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