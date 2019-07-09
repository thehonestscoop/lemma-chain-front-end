import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Form, FormGroup, FormFeedback, Input, Button } from 'reactstrap';
import { isNotOwner, isEmail } from '../helpers/input-validation';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  RECAPTCHA_CLIENT_KEY,
  BASE_URL,
  alertWarning,
  alertSuccess,
  alertError
} from '../helpers/Globals';

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
  let recaptchaRef: React.RefObject<ReCAPTCHA> = React.createRef();
  const [recaptcha, setRecaptcha] = useState<string | null>('');
  const checkPassword = (value: string) => {
    const matches = !(value === user.password_1);
    return matches;
  };
  useEffect(() => {
    recaptchaRef.current!.execute();
  }, [recaptchaRef]);
  // const handleRecaptcha = (val: string | null) => setRecaptcha(val);
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

  const submitForm = () => {
    // e.preventDefault();
    // setUser({ ...user, disabled: true });
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
    } else if (!recaptcha_code) {
      alertWarning('Captcha not authenticated. Reload Page');
    } else {
      console.log(req);
      // Axios.post(`${BASE_URL}/accounts`, req)
      //   .then(res => {
      //     AUTH_SYNC(name, email, password_1);
      //     alertSuccess('Account Created');
      //     props.history.push('/create-ref');
      //   })
      //   .catch(err => {
      //     if (err.response) {
      //       alertError(err.response.data.error);
      //     } else {
      //       alertError(err.message);
      //     }
      //   });
    }
  };

  return (
    <Form style={{ width: '100%', padding: '0 5vw' }}>
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
          invalid={user.password_1.length < 8 && user.password_1.length !== 0}
          onChange={e => inputChange(e.target)}
        />
        <FormFeedback invalid="">
          Password should not be less than 8 characters
        </FormFeedback>
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
          onChange={val => setRecaptcha(val)}
          onExpired={() => recaptchaRef.current!.execute()}
          ref={recaptchaRef}
          size="invisible"
        />
      </div>
      <Button onClick={submitForm} color="success" className="mt-3">
        Register
      </Button>
    </Form>
  );
};

export default Register;
