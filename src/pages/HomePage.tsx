import {Link} from "react-router-dom"
import {localStorageManager} from "../LocalStorageManager"
import { useEffect } from "react";
import {game} from "../index";

export const HomePage = () => {
  useEffect(() =>
  {
    localStorageManager.loggedIn = false;
    if (game.hasStarted)
    {
      game.unMount();
    }
  }, []);

  return (
    <div>
      <h1>Home Page 💚</h1>
      <Link to="/Login">Login</Link>
      <br />
      <Link to="SignUp">Sign Up</Link>
    </div>
  )
}