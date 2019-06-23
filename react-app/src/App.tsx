import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import "./App.css";
// import Modal from "./components/Modal/Modal";
import Login from "./components/Login/Login";
import LemmaForm from "./components/LemmaForm/LemmaForm";
import NavBar from "./components/NavBar";
import Register from "./components/Register";

const App: FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Container className="mt-5" style={{maxWidth: '650px'}}>
        <Redirect path="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/create-ref" component={LemmaForm} />
        <Route path="/create-account" component={Register} />
      </Container>
    </div>
  );
};

export default App;
