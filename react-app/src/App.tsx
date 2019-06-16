import React, { FC } from 'react';
import './App.css';
import Modal from './components/Modal/Modal';
import Login from './components/Login/Login';
// import LemmaForm from './components/LemmaForm/LemmaForm';

const App: FC = () => {
  const LoginModal = Modal(Login);
  return (
    <div className="App">
      <LoginModal />
      {/* <LemmaForm /> */}
    </div>
  );
}

export default App;
