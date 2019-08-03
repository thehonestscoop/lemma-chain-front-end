import React, { useState } from 'react';
import Axios from 'axios';
import { Form, FormGroup, FormFeedback, Input, Button } from 'reactstrap';
import { isNotOwner, isEmail } from '../helpers/input-validation';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  RECAPTCHA_CLIENT_KEY,
  BASE_URL,
  alertWarning,
  alertError
} from '../helpers/Globals';
import { AUTH_SYNC } from '../helpers/functions';
import LogoDark from '../logo-dark';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Logo } from './LemmaForm/LemmaForm';

const mySwal = withReactContent(Swal);

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

const Register = (props: any) => {
  const alertSuccess = (message: string) =>
    mySwal
      .fire({
        type: 'success',
        title: message,
        showConfirmButton: true
      })
      .then(dismiss => props.history.push('/'));

  const [user, setUser] = useState<RegState>({
    name: '',
    invalidname: false,
    email: '',
    invalidemail: false,
    password_1: '',
    invalidpassword_2: false,
    password_2: '',
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
    if (!input.value) {
      setUser({
        ...user,
        [`invalid${input.id}`]: false,
        [input.id]: input.value
      });
    } else if (isNotOwner.test(input.value) && input.id === 'name') {
      setUser(inValidUser);
    } else if (!isEmail.test(input.value) && input.id === 'email') {
      setUser(inValidUser);
    } else if (checkPassword(input.value) && input.id === 'password_2') {
      setUser(inValidUser);
    } else {
      setUser({
        ...user,
        [`invalid${input.id}`]: false,
        [input.id]: input.value
      });
    }
  };

  const [recaptcha, setRecaptcha] = useState<string | null>('');

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ ...user, disabled: true });
    const { name, email, password_1, password_2 } = user;
    const recaptcha_code = recaptcha;
    const req = { name, email, password_1, password_2, recaptcha_code };

    if (name.length > 100) {
      alertWarning('Name cannot be greater than 100 characters');
    } else if (!name) {
      alertWarning('Name must not be empty');
    } else if (isNotOwner.test(name)) {
      alertWarning('Invalid Name(No whitespaces, @ or /)');
    } else if (!isEmail.test(email)) {
      alertWarning('Invalid Email Address');
    } else if (!password_1) {
      alertWarning('password cannot be empty');
    } else if (password_1 !== password_2) {
      alertWarning("Passwords doesn't match");
    } else if (recaptcha_code === '') {
      alertWarning('Verify Captcha please');
    } else {
      Axios.post(`${BASE_URL}/accounts`, req)
        .then(res => {
          AUTH_SYNC(name, email, password_1);
          alertSuccess(
            'An activation link has been sent to your email address. Please check your spam folder.'
          );
          props.history.push('/');
        })
        .catch(err => {
          if (err.response) {
            alertError(err.response.data.error);
          } else {
            alertError(err.message);
          }
        });
    }
  };

  return (
    <Form style={{ width: '100%', padding: '0 5vw' }}>
      <Logo>
        <LogoDark rect_bg="white" bubble_color="#33cc33" />
      </Logo>
      <h3
        style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#333333'
        }}
      >
        Create Account
      </h3>
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
          autoComplete="new-password"
          value={user.password_1}
          onChange={e => inputChange(e.target)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          invalid={user.invalidpassword_2}
          type="password"
          id="password_2"
          autoComplete="new-password"
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
    </Form>
  );
};

export default Register;
