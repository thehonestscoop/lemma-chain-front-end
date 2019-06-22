import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

interface RegState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  disabled: boolean;
}

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
    <Form onSubmit={e => submitForm(e)}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="with a placeholder"
          value={user.name}
          onChange={e => inputChange(e.target)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="with a placeholder"
          value={user.email}
          onChange={e => inputChange(e.target)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter password"
          value={user.password}
          onChange={e => inputChange(e.target)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="confirmPassword">Confrim Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Enter password again"
          value={user.confirmPassword}
          onChange={e => inputChange(e.target)}
        />
      </FormGroup>
      <Button onClick={submitForm}>Submit</Button>
    </Form>
  );
};

export default Register;
