export const LoginSignupWidgetModeStrings = {
    Login: "Log in",
    SignUp: "Sign up"
} as const;

export type LoginSignUpWidgetModes = keyof typeof LoginSignupWidgetModeStrings;