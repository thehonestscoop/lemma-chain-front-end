import * as React from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';

interface LoginState {
    email: string,
    password: string,
    disabled: boolean
}

const Login = () => {
    
    const [loginUser, setLoginUser] = useState<LoginState>({email: '', password: '', disabled: false})

    const emailChange = (input: EventTarget & HTMLInputElement) =>
        setLoginUser({...loginUser, email: input.value})
        
    const passwordChange = (input: EventTarget & HTMLInputElement) =>
        setLoginUser({...loginUser, password: input.value})
    const submitForm = (e: Event) => { 
        e.preventDefault();
        setLoginUser({...loginUser, disabled: true}) 
        console.log(loginUser); 
    }

    return (
        <LoginForm
            email={loginUser.email}
            password={loginUser.password}
            disabled={loginUser.disabled}
            emailChange={emailChange}
            passwordChange={passwordChange}
            submitForm={submitForm}
        />
    )
}

export default Login;
