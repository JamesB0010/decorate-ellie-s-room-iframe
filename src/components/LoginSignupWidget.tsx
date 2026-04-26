import {type LoginSignUpWidgetModes, LoginSignupWidgetModeStrings} from "../constants/LoginSignupWidgetModes";
import {createRef, type SubmitEvent} from "react";

export interface LoginSignupWidgetProps{
    mode: LoginSignUpWidgetModes,
    onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}


export const LoginSignupWidget = ({mode, onSubmit}: LoginSignupWidgetProps) =>
{
    const usernameInputRef = createRef<HTMLInputElement>();
    const passwordInputRef = createRef<HTMLInputElement>();
    const actionButtonRef = createRef<HTMLButtonElement>();

    const formSubmit = (event: SubmitEvent<HTMLFormElement>) =>
    {
        if (!usernameInputRef.current || !passwordInputRef.current)
        {
            return;
        }

        event.preventDefault();

        if (
            usernameInputRef.current.value.length !== 0 &&
            passwordInputRef.current.value.length !== 0
        ){
            onSubmit(event);
            usernameInputRef.current.value = "";
            passwordInputRef.current.value = "";
            usernameInputRef.current.blur();
            passwordInputRef.current.blur();
            actionButtonRef.current?.blur();
        }
    };
    

    const modeString = LoginSignupWidgetModeStrings[mode];
    return (
        <form onSubmit={formSubmit}>
            <h2>{modeString}</h2>   
            <input id = "usernameInput" type="text" placeholder="Username" ref={usernameInputRef}/>
            <br />
            <input id = "passwordInput" type="password" placeholder="Password" ref={passwordInputRef}/>
            <br />
            <button type="submit" ref={actionButtonRef}>{modeString}</button>
        </form>
    )
}