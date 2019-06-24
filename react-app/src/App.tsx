import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import "./App.css";

import Login from "./components/Login/Login";
import LemmaForm from "./components/LemmaForm/LemmaForm";
import NavBar from "./components/NavBar";
import Register from "./components/Register";

const App: FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Container className="mt-5" style={{ maxWidth: "650px" }}>
        <Redirect path="/" to="/login" />
        <Route path="/login" render={rProps => <Login {...rProps} />} />
        <Route
          path="/create-ref"
          render={rProps => <LemmaForm {...rProps} />}
        />
        <Route path="/create-account" render={rProps => <Register {...rProps}/>} />
      </Container>
    </div>
  );
};

export default App;
