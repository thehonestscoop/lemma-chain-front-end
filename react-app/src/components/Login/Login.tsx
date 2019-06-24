import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { isEmail } from "../../helpers/input-validation";
import { AUTH_VERIFY } from "../../helpers/functions";

interface LoginState {
  email: string;
  password: string;
  disabled: boolean;
}

const Login = (props: any) => {
  const [loginUser, setLoginUser] = useState<LoginState>({
    email: "",
    password: "",
    disabled: false
  });

  const emailChange = (input: EventTarget & HTMLInputElement) => {
      setLoginUser({ ...loginUser, email: input.value});
  };

  const passwordChange = (input: EventTarget & HTMLInputElement) =>
    setLoginUser({ ...loginUser, password: input.value });

  const submitForm = (e: Event) => {
    e.preventDefault();
    // setLoginUser({ ...loginUser, disabled: true });
    const { email, password } = loginUser;
    if (email === "" || password === "") {
      alert("The fields must be filled");
    } else if (!AUTH_VERIFY(email, password)) {
      alert("Incorrect Password or Email");
    } else {
      props.history.push("/create-ref");
    }
  };

  return (
    <LoginForm
      email={loginUser.email}
      password={loginUser.password}
      disabled={loginUser.disabled}
      emailChange={emailChange}
      passwordChange={passwordChange}
      submitForm={submitForm}
    />
  );
};

export default Login;
