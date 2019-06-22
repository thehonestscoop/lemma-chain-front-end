import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import "./App.css";
// import Modal from "./components/Modal/Modal";
import Login from "./components/Login/Login";
import LemmaForm from "./components/LemmaForm/LemmaForm";
import NavBar from "./components/NavBar";

const App: FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Redirect path="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/create-ref" component={LemmaForm} />
      <Route path="/create-account" component={LemmaForm} />
    </div>
  );
};

export default App;
