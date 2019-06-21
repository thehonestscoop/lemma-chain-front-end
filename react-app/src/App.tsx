import React, { FC, useState } from 'react';
import './App.css';
import Modal from './components/Modal/Modal';
import Login from './components/Login/Login';
import LemmaForm from './components/LemmaForm/LemmaForm';
import { Button } from 'react-bootstrap';

const App: FC = () => {
  const [modal, setModal] = useState(true)

  const toggleModal = () => setModal(!modal);

  const LoginModal = Modal(Login);
  return (
    <div className="App">
      <Button>My Button</Button>
      <LoginModal toggleModal={toggleModal} active={modal}/>
      <LemmaForm />
    </div>
  );
}

export default App;
