import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, FormFeedback, Input, Button } from "reactstrap";
import styled from "styled-components";
import { isNotOwner, isEmail } from "../helpers/input-validation";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_CLIENT_KEY } from "../helpers/Globals";

interface RegState {
  name: string;
  invalidname: boolean;
  email: string;
  invalidemail: boolean;
  password_1: string;
  invalidpassword_2: boolean;
  password_2: string;
  disabled: boolean;
}

const LoginLink = styled("p")`
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
    invalidname: false,
    email: "",
    invalidemail: false,
    password_1: "",
    invalidpassword_2: false,
    password_2: "",
    disabled: false
  });

  const checkPassword = (value: string) => {
    const matches = !(value === user.password_1);
    return matches;
  };
  const handleRecaptcha = (val: string | null) => setRecaptcha(val);
  const inputChange = (input: EventTarget & HTMLInputElement) => {
    const inValidUser = {
      ...user,
      [`invalid${input.id}`]: true,
      [input.id]: input.value
    };
    if (isNotOwner.test(input.value) && input.id === "name") {
      setUser(inValidUser);
    } else if (!isEmail.test(input.value) && input.id === "email") {
      setUser(inValidUser);
    } else if (checkPassword(input.value) && input.id === "password_2") {
      setUser(inValidUser);
    } else {
      setUser({
        ...user,
        [`invalid${input.id}`]: false,
        [input.id]: input.value
      });
    }
  };

  const [recaptcha, setRecaptcha] = useState<string | null>("");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ ...user, disabled: true });
    const { name, email, password_1, password_2 } = user;
    const recaptcha_code = recaptcha;
    const req = { name, email, password_1, password_2, recaptcha_code }
    if(Object.values(req).some(field => field === '')) {
      alert('Please fill all the form fields')
    } else {
      if(!isEmail.test(email)){
        alert('Invalid Email Address')
      } else if(name.length > 100) {
        alert('Name cannot be greater than 100 characters')
      } else if(isNotOwner.test(name)){
        alert("Invalid Name(No whitespaces, @ or /)")
      } else if(password_1 !== password_2) {
        alert("Passwords doesn't match")
      } else if(recaptcha_code === ''){
        alert("Verify Captcha please")
      } else {
        console.log(req)
      }
    }
  };

  return (
    <Form>
      <FormGroup>
        <Input
          invalid={user.invalidname}
          type="text"
          id="name"
          placeholder="Name"
          value={user.name}
          onChange={e => inputChange(e.target)}
        />
        <FormFeedback invalid="">
          Name must not contain (@, /, or whitespace)
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input
          invalid={user.invalidemail}
          type="email"
          id="email"
          placeholder="Email"
          value={user.email}
          onChange={e => inputChange(e.target)}
        />
        <FormFeedback invalid="">Invalid Email Address</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          id="password_1"
          placeholder="Password"
          value={user.password_1}
          onChange={e => inputChange(e.target)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          invalid={user.invalidpassword_2}
          type="password"
          id="password_2"
          placeholder="Confirm Password"
          value={user.password_2}
          onChange={e => inputChange(e.target)}
        />
        <FormFeedback invalid="">Passwords doesn't match</FormFeedback>
      </FormGroup>
      <div className="recaptcha">
        <ReCAPTCHA
          sitekey={RECAPTCHA_CLIENT_KEY}
          onChange={val => handleRecaptcha(val)}
        />
      </div>
      <Button onClick={submitForm} color="success" className="mt-3">
        Register
      </Button>
      <LoginLink>
        <Link to="/login">Already Signed Up - Log in</Link>
      </LoginLink>
    </Form>
  );
};

export default Register;
