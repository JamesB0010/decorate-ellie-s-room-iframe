import {type LoginSignUpWidgetModes, LoginSignupWidgetModeStrings} from "../constants/LoginSignupWidgetModes";
import {createRef, type SubmitEvent} from "react";

export interface LoginSignupWidgetProps{
    mode: LoginSignUpWidgetModes,
    onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}


export const LoginSignupWidget = ({mode, onSubmit}: LoginSignupWidgetProps) =>
{
    const usernameInput = createRef<HTMLInputElement>();
    const passwordInput = createRef<HTMLInputElement>();

    const formSubmit = (event: SubmitEvent<HTMLFormElement>) =>
    {
        if (!usernameInput.current || !passwordInput.current)
        {
            return;
        }

        event.preventDefault();

        if (
            usernameInput.current.value.length !== 0 &&
            passwordInput.current.value.length !== 0
        ){
            onSubmit(event);
            usernameInput.current.value = "";
            passwordInput.current.value = "";
        }
    };
    

    const modeString = LoginSignupWidgetModeStrings[mode];
    return (
        <form onSubmit={formSubmit}>
            <h2>{modeString}</h2>   
            <input id = "usernameInput" type="text" placeholder="Username" ref={usernameInput}/>
            <br />
            <input id = "passwordInput" type="password" placeholder="Password" ref={passwordInput}/>
            <br />
            <button type="submit">{modeString}</button>
        </form>
    )
}