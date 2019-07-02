import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const NavBar = () => {
  return (
    <Nav>
        <NavLink to="/create-account">
          Create Account
        </NavLink>
        <NavLink to="/login">
          Login
        </NavLink>
        <NavLink to="/create-ref">
          Create Ref
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
        padding: 1rem;
    border-bottom: 1px solid #80808059;
    min-width: 200px;
    color: white;
    font-weight: 600;
      }
`;

export default NavBar;
