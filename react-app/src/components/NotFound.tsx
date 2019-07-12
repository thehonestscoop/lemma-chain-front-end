import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>This Page doesn't exist!</h1>
      <Link to="/">Go to main page</Link>
    </div>
  );
};

export default NotFound;
