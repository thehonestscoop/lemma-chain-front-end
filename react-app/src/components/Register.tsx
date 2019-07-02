import React, { useState } from 'react';
import Axios from 'axios';
import { Form, FormGroup, FormFeedback, Input, Button } from 'reactstrap';
import { isNotOwner, isEmail } from '../helpers/input-validation';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_CLIENT_KEY, BASE_URL } from '../helpers/Globals';
import { AUTH_SYNC } from '../helpers/functions';

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
    if (isNotOwner.test(input.value) && input.id === 'name') {
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
    if (Object.values(req).some(field => field === '')) {
      alert('Please fill all the form fields');
    } else {
      if (!isEmail.test(email)) {
        alert('Invalid Email Address');
      } else if (name.length > 100) {
        alert('Name cannot be greater than 100 characters');
      } else if (isNotOwner.test(name)) {
        alert('Invalid Name(No whitespaces, @ or /)');
      } else if (password_1 !== password_2) {
        alert("Passwords doesn't match");
      } else if (recaptcha_code === '') {
        alert('Verify Captcha please');
      } else {
        Axios.post(`${BASE_URL}/accounts`, req)
          .then(res => {
            AUTH_SYNC(name, email, password_1);
            props.history.push('/login');
          })
          .catch(err => {
            alert(err.response.data.error);
          });
      }
    }
  };

  return (
    <Form style={{ width: '100%', padding: '0 3rem' }}>
      <h3 style={{ textAlign: 'center' }}>Create Account</h3>
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
    </Form>
  );
};

export default Register;
