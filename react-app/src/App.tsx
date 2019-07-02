import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import styled from 'styled-components';
import "./App.css";

import Login from "./components/Login/Login";
import LemmaForm from "./components/LemmaForm/LemmaForm";
import NavBar from "./components/NavBar";
import Register from "./components/Register";

const App: FC = () => {
  return (
    <div className="App">
      <Main>
      <NavBar />
      <Content>
        <Redirect path="/" exact to="/create-ref" />
        {/* <Route path="/login" render={rProps => <Login {...rProps} />} /> */}
        <Route
          path="/create-ref"
          render={rProps => <LemmaForm {...rProps} />}
        />
        <Route
          path="/create-account"
          render={rProps => <Register {...rProps} />}
        />
      </Content>
      </Main>
    </div>
  );
};
const Content = styled.section`
  padding: 2rem;
  display: flex;
  flex-direction: column;
    align-items: center;
    width: 100%;
`;
const Main = styled.main`
      display: flex;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    min-height: 550px;
`;

export default App;
