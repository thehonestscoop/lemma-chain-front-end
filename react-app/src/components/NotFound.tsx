import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './LemmaForm/LemmaForm';
import LogoDark from '../logo-dark';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Logo>
        <LogoDark rect_bg="white" bubble_color="#33cc33" />
      </Logo>
      <h1>This Page doesn't exist!</h1>
      <Link to="/">Go to main page</Link>
    </div>
  );
};

export default NotFound;
