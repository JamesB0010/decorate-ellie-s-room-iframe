import {Link} from "react-router-dom"
import { LoginSignupWidget } from "../components/LoginSignupWidget"
import {type SubmitEvent, useCallback} from "react";

export const SignUp = () => {
  const signUpSubmit = useCallback((event: SubmitEvent<HTMLFormElement>) =>{
    }, []);

  return (
    <div>
      <h1>SignUp 💚</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/Login">Log in</Link>
      <br />
      <LoginSignupWidget mode="SignUp" onSubmit={signUpSubmit}/>
    </div>
  )
}