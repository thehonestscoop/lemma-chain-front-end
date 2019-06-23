import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Input, Button } from "reactstrap";

interface LoginProps {
  email: string;
  password: string;
  disabled: boolean;
  emailChange: Function;
  passwordChange: Function;
  submitForm: Function;
}
const User = styled("div")`
  height: 60px;
  width: 60px;
  align-self: center;
  background-color: white;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  border: 1px var(--secondary) solid;
  &::before {
    height: 35%;
    width: 35%;
    content: "";
    border: 1px solid var(--secondary);
    position: absolute;
    top: 6%;
    left: 32.5%;
    border-radius: 50%;
  }
  &::after {
    height: 80%;
    width: 80%;
    content: "";
    border: 1px solid var(--secondary);
    position: absolute;
    top: 46%;
    left: 10%;
    border-radius: 50%;
  }
`;
const SignUpLink = styled("p")`
  margin-top: 1rem;
  font-size: 14px;
  font-weight: 500;
  color: #2a2a2a;
  font-style: italic;
  border-left: 1px solid grey;
  padding: 0 0.5rem;
`;
const FormContainer = styled("div")`
  display: flex;
  flex-direction: column;
  input {
    font-weight: 500;
  }
`;

const LoginForm = (props: LoginProps) => {
  return (
    <FormContainer>
      <User />
      <form>
        <Input
          type="text"
          placeholder="Email"
          value={props.email}
          onChange={e => props.emailChange(e.target)}
          className="mt-2"
        />
        <Input
          type="password"
          name="Password"
          placeholder="Password"
          value={props.password}
          onChange={e => props.passwordChange(e.target)}
          className="mt-2"
        />
        <Button
          color="success"
          className="mt-3"
          onClick={e => props.submitForm(e)}
          disabled={props.disabled}
        >
          Login
        </Button>
      </form>
      <SignUpLink>
        <Link to="/create-account">Or Sign Up</Link>
      </SignUpLink>
    </FormContainer>
  );
};

export default LoginForm;
