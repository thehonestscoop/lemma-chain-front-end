import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Badge } from 'reactstrap';

const NavBar = (props: { refs: { ref: string; title: string }[] }) => {
  return (
    <Nav>
      <NavLink to="/create-ref">
        <span className="menu">CR</span> Create Ref
      </NavLink>
      <NavLink to="/create-account">
        <span className="menu">CA</span> Create Account
      </NavLink>
      <NavLink to="/refs">
        <span className="menu">YR</span> Your Refs{' '}
        <Badge pill={true} color="success">
          {props.refs.length}
        </Badge>
      </NavLink>
    </Nav>
  );
};
const Nav = styled.nav`
  background: #3e4061;
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
    @media (max-width: 500px) {
      padding: 0.8rem 1rem;
    }
    &.active {
      color: white;
    }
    &:hover {
      text-decoration: none;
    }
    span.menu {
      border-radius: 50%;
      background-color: #cccccc;
      color: #3e4061;
      font-size: 1.2rem;
      height: calc(3vw + 1.5rem);
      width: calc(3vw + 1.5rem);
      display: flex;
      font-weight: 400;
      justify-content: center;
      align-items: center;
      margin-right: 0.5rem;
      box-shadow: 1px 1px 15px #00000036;
      @media (max-width: 500px) {
        font-size: 1rem;
      }
    }
    &.active span {
      background-color: #33cc33;
      color: white;
    }
  }
`;

export default NavBar;
