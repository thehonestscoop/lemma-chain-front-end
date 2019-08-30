import React, { FC, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import LemmaForm from './components/LemmaForm/LemmaForm';
import NavBar from './components/NavBar';
import Register from './components/Register';
import CreatedRefs from './components/CreatedRefs';

const App: FC = () => {
  const [refs, setRefs] = useState<{ ref: string; title: string }[]>([]);
  const addRef = (ref: string, title: string) =>
    setRefs([...refs, { ref, title }]);
  return (
    <AppCon className="App">
      <Main>
        <NavBar refs={refs} />
        <Content>
          <Switch>
            <Route
              path="/"
              exact
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
            <Redirect path="*" to="/" />
          </Switch>
        </Content>
      </Main>
    </AppCon>
  );
};
const Content = styled.section`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
  @media (max-width: 500px) {
    margin-top: 3.5rem;
  }
`;
const Main = styled.main`
  display: flex;
  background-color: white;
  border-radius: 10px;
  /* max-height: 800px; */
  overflow: hidden;
  min-height: 550px;
  max-width: 900px;
  flex: 1;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media (max-width: 600px) {
    border-radius: 0;
    max-height: unset;
  }
`;
const AppCon = styled.div`
  background-image: -webkit-linear-gradient(
    136deg,
    rgb(116, 235, 213) 0%,
    rgb(63, 43, 150) 100%
  );
  height: 100%;
  min-height: 100vh;
  width: 100%;
  padding: 3rem 5vw;
  display: flex;
  justify-content: center;
  @media (max-width: 500px) {
    padding: 0;
  }
`;

export default App;
