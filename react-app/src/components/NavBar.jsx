import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = () => {
  return (
    <Nav>
      <NavLink to="/create-ref">
        <span>CR</span> Create Ref
      </NavLink>
      <NavLink to="/create-account">
        <span>CA</span> Create Account
      </NavLink>
    </Nav>
  );
};
const Nav = styled.nav`
  background: #3e4061;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;

  a {
    padding: 1.5rem 1rem;
    border-bottom: 1px solid #80808059;
    min-width: 250px;
    font-weight: 600;
    color: #cccccc;
    display: flex;
    align-items: center;
    &.active {
      color: white;
    }
    &:hover {
      text-decoration: none;
    }
    span {
      border-radius: 50%;
      background-color: #cccccc;
      color: #3e4061;
      font-size: 1.2rem;
      height: 3rem;
      display: flex;
      font-weight: 400;
      justify-content: center;
      align-items: center;
      width: 3rem;
      margin-right: 0.5rem;
      box-shadow: 1px 1px 15px #00000036;
    }
    &.active span {
      background-color: #33cc33;
      color: white;
    }
  }
`;

export default NavBar;
