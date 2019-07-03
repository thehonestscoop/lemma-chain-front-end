import React, { FC, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

// import Login from './components/Login/Login';
import LemmaForm from './components/LemmaForm/LemmaForm';
import NavBar from './components/NavBar';
import Register from './components/Register';
import CreatedRefs from './components/CreatedRefs';

const App: FC = () => {
  const [refs, setRefs] = useState<string[]>([]);
  const addRef = (ref: string) => setRefs([...refs, ref]);
  return (
    <div className="App">
      <Main>
        <NavBar refs={refs} />
        <Content>
          <Redirect path="/" exact to="/create-ref" />
          {/* <Route path="/login" render={rProps => <Login {...rProps} />} /> */}
          <Route
            path="/create-ref"
            render={rProps => <LemmaForm {...rProps} addRef={addRef} />}
          />
          <Route
            path="/create-account"
            render={rProps => <Register {...rProps} />}
          />
          <Route
            path="/refs"
            render={rProps => <CreatedRefs {...rProps} refs={refs} />}
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
  max-width: 900px;
  flex: 1;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export default App;
