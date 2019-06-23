import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { isEmail } from "../../helpers/input-validation";

interface LoginState {
  email: string;
  invalidemail: boolean;
  password: string;
  disabled: boolean;
}

const Login = (props: any) => {
  const [loginUser, setLoginUser] = useState<LoginState>({
    email: "",
    password: "",
    invalidemail: false,
    disabled: false
  });

  const emailChange = (input: EventTarget & HTMLInputElement) => {
    if (!isEmail.test(input.value)) {
      setLoginUser({ ...loginUser, email: input.value, invalidemail: true });
    } else {
      setLoginUser({ ...loginUser, email: input.value, invalidemail: false });
    }
  };

  const passwordChange = (input: EventTarget & HTMLInputElement) =>
    setLoginUser({ ...loginUser, password: input.value });
  const submitForm = (e: Event) => {
    e.preventDefault();
    setLoginUser({ ...loginUser, disabled: true });
    const req = {
      "X-AUTH-ACCOUNT": loginUser.email,
      "X-AUTH-PASSWORD": loginUser.password
    };
    localStorage.setItem("auths", JSON.stringify(req));
    props.history.push("/create-ref");
  };

  return (
    <LoginForm
      email={loginUser.email}
      password={loginUser.password}
      disabled={loginUser.disabled}
      emailChange={emailChange}
      passwordChange={passwordChange}
      submitForm={submitForm}
      invalidemail={loginUser.invalidemail}
    />
  );
};

export default Login;
