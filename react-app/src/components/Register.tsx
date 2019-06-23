import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import styled from 'styled-components';

interface RegState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  disabled: boolean;
}

const LoginLink = styled('p')`
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

const Register = () => {
  const [user, setUser] = useState<RegState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    disabled: false
  });

  const inputChange = (input: EventTarget & HTMLInputElement) =>
    setUser({ ...user, [input.id]: input.value });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ ...user, disabled: true });
    console.log(user);
  };

  return (
    <Form>
      <FormGroup>
        <Input
          type="text"
          id="name"
          placeholder="Name"
          value={user.name}
          onChange={e => inputChange(e.target)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={user.email}
          onChange={e => inputChange(e.target)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={user.password}
          onChange={e => inputChange(e.target)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={e => inputChange(e.target)}
        />
      </FormGroup>
      <Button onClick={submitForm} color="primary">
        Register
      </Button>
      <LoginLink><Link to="/login">Already Signed Up - Log in</Link></LoginLink>
    </Form>
  );
};

export default Register;
