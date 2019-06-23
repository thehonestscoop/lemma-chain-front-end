import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Input } from '../StyledComponents/Input';

interface LoginProps {
    email: string,
    password: string,
    disabled: boolean,
    emailChange: Function,
    passwordChange: Function
    submitForm: Function
}
const User = styled('div')`
    height: 100px;
    width: 100px;
    background-color: white;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    border: 2px white solid;
    &::before {
        height: 35%;
        width: 35%;
        content: '';
        background-color: #c3d0c7;
        position: absolute;
        top: 6%;
        left: 32.5%;
        border-radius: 50%;
    }
    &::after {
        height: 80%;
        width: 80%;
        content: '';
        background-color: #c3d0c7;
        position: absolute;
        top: 46%;
        left: 10%;
        border-radius: 50%;
    }
`;
const SignUpLink = styled('p')`
    margin-top: 1rem;
    font-size: 14px;
    font-weight: 500;
    color: #2a2a2a;
    font-style: italic;
    border-left: 1px solid grey;
    padding: 0 0.5rem;
    &:hover {
        color: white;
        cursor: pointer;
    }
`;
const FormContainer = styled('div')`
    padding: 3rem 6vw;
    background-color: #c3d0c7;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        font-weight: 500;
    }
    input[type="submit"] {
        margin-top: 0.7rem;
        padding: 8px 2rem;
        border-radius: 10px;
        border: none;
        background-color: #0ddb46;
        color: white;
        &.disabled {
            background-color: lightgrey;
        }
    }
`;

const LoginForm = (props: LoginProps) => {
    return (
        <FormContainer>
            <User />
            <form onSubmit={(e) => props.submitForm(e)}>
                <Input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    value={props.email}
                    changeHandle={props.emailChange}
                />
                <Input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    value={props.password}
                    changeHandle={props.passwordChange}
                />
                <input type="submit" 
                    className={props.disabled ? 'disabled': ''}
                    value="Login" disabled={props.disabled}/>
            </form>
            <SignUpLink><Link to="/create-account">Or Sign Up</Link></SignUpLink> 
        </FormContainer>
    )
}

export default LoginForm;
