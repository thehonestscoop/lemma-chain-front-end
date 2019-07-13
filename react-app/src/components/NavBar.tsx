import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Badge, UncontrolledTooltip } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BASE_URL } from '../helpers/Globals';
import { FiSearch } from 'react-icons/fi';

const InputAlert = withReactContent(Swal);
const alertIt = async () => {
  const { value: terms } = await InputAlert.fire({
    title: 'Search',
    input: 'text',
    inputPlaceholder: 'Enter search terms',
    showCancelButton: true,
    inputValidator: (value): any => {
      if (!value) {
        return 'Search terms must not be empty!';
      }
    }
  });

  if (terms) {
    window.open(`${BASE_URL}/search/${encodeURI(terms)}`, '_blank');
  }
};

const NavBar = (props: { refs: { ref: string; title: string }[] }) => {
  return (
    <>
      <Nav>
        <NavLink to="/" exact={true}>
          <span className="menu">CR</span> Create Ref
        </NavLink>
        <NavLink to="/create-account">
          <span className="menu">CA</span> Create Account
        </NavLink>
        <NavLink to="/refs">
          <span className="menu">LS</span> Links
          <Badge pill={true} color="success">
            {props.refs.length}
          </Badge>
        </NavLink>
        <NavLink to="/account-ref">
          <span className="menu">AC</span> Account
        </NavLink>
        <Search onClick={alertIt}>Search</Search>
      </Nav>
      <Nav className="mobile">
        <NavLink to="/" exact={true}>
          Create
        </NavLink>
        <NavLink to="/create-account">Sign Up</NavLink>
        <NavLink to="/refs">
          Links
          <Badge pill={true} color="success">
            {props.refs.length}
          </Badge>
        </NavLink>
        <NavLink to="/account-ref">Account</NavLink>
        <NavLink to="#" className="search">
          <FiSearch
            onClick={alertIt}
            id="search"
            style={{ fontSize: '1.7rem', strokeWidth: '3px' }}
          />
        </NavLink>
      </Nav>
    </>
  );
};
const Nav = styled.nav`
  background: #3e4061;
  display: flex;
  flex-direction: column;
  position: relative;
  @media (max-width: 768px) {
    display: none;
  }

  &.mobile {
    display: none;
    flex-direction: row;
    position: unset;
    box-shadow: 0px 2px 5px #0000002e;
    @media (max-width: 768px) {
      display: flex;
    }
  }

  a {
    padding: 1.5rem 1rem;
    border-bottom: 1px solid #80808059;
    min-width: 250px;
    font-weight: 600;
    color: #cccccc;
    cursor: pointer;
    display: flex;
    align-items: center;
    .badge-pill {
      margin-left: 5px;
    }
    @media (max-width: 768px) {
      padding: 0.8rem 5px;
      justify-content: center;
      min-width: unset;
      flex: 1;
      border-bottom: unset;
      .badge-pill {
        padding-right: 0.2rem;
        padding-left: 0.2rem;
        padding-top: 0.1rem;
        padding-bottom: 0.135rem;
        font-size: 0.7rem;
        margin-left: 2px;
      }
      &.active {
        color: #3e4061 !important;
        background-color: white;
      }
    }
    &.search::before {
      content: ' ';
      background-color: grey;
      height: 22px;
      margin-right: 12px;
      width: 1px;
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
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
    &.active span {
      background-color: #33cc33;
      color: white;
    }
  }
`;
const Search = styled.div`
  overflow: hidden;
  vertical-align: middle;
  position: absolute;
  bottom: 5%;
  right: 5%;
  font-weight: 500;
  padding: 0.5rem 1.5rem;
  border: 1px white solid;
  border-radius: 25px;
  color: white;
  cursor: pointer;
`;

export default NavBar;
