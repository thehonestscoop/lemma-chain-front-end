import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface RegState {
  name: string;
  email: string;
  password: string;
  disabled: boolean;
}

const Register = () => {
  const [user, setUser] = useState<RegState>({
    name: "",
    email: "",
    password: "",
    disabled: false
  });

  const emailChange = (input: EventTarget & HTMLInputElement) =>
    setUser({ ...user, email: input.value });

  const passwordChange = (input: EventTarget & HTMLInputElement) =>
    setUser({ ...user, password: input.value });

  const submitForm = (e: Event) => {
    e.preventDefault();
    setUser({ ...user, disabled: true });
    console.log(user);
  };

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Register;
