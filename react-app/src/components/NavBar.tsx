import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Badge } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BASE_URL } from '../helpers/Globals';
import { FiSearch } from 'react-icons/fi';
import Axios from 'axios';

const InputAlert = withReactContent(Swal);
const searchIt = async () => {
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

const alertIt = async () => {
  const { value: formValues } = await InputAlert.fire({
    title: 'Account',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Account name">' +
      '<input id="swal-input2" autoComplete="new-password" class="swal2-input" type="password" placeholder="Password - optional">',
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      const inputs: Array<any> = [
        document.getElementById('swal-input1'),
        document.getElementById('swal-input2')
      ];
      return inputs.map(inp => inp.value);
    }
  });

  const alertError = (message: string) =>
    InputAlert.fire({
      type: 'error',
      title: message,
      showConfirmButton: true,
      confirmButtonText: 'Try again',
      showCancelButton: true
    }).then(val => {
      if (!!val.value) {
        alertIt();
      }
    });

  if (formValues) {
    if (formValues[0] && formValues[1]) {
      Axios.get(`${BASE_URL}/accounts/${'@' + formValues[0]}`, {
        headers: {
          'X-AUTH-ACCOUNT': '@' + formValues[0],
          'X-AUTH-PASSWORD': formValues[1]
        }
      })
        .then(res => {
          const jsonString = JSON.stringify(res.data, null, 2);
          let tab = window.open('about:blank', '_blank');
          tab!.document.write(`<pre>${jsonString}</pre>`); // where 'html' is a variable containing your HTML
          tab!.document.close();
        })
        .catch(err => {
          if (err.response.status === 401) {
            alertError('Password is not correct');
          } else if (err.response.status === 404) {
            alertError("Account doesn't exist");
          }
        });
    } else if (formValues[0]) {
      Axios.get(`${BASE_URL}/accounts/${'@' + formValues[0]}`)
        .then(res => {
          window.open(`${BASE_URL}/accounts/${'@' + formValues[0]}`, '_blank');
          // const jsonString = JSON.stringify(res.data, null, 2);
          // let tab = window.open('about:blank', '_blank');
          // tab!.document.write(`<pre>${jsonString}</pre>`); // where 'html' is a variable containing your HTML
          // tab!.document.close();
        })
        .catch(err => {
          if (err.response.status === 404) {
            alertError("Account doesn't exist");
          }
        });
    }
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
        <NavLink to="#" onClick={alertIt}>
          <span className="menu">AC</span>
          Account
        </NavLink>
        <NavLink to="#" onClick={searchIt}>
          <span className="menu">SC</span>
          Search
        </NavLink>
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
        <NavLink to="#" onClick={alertIt}>
          Account
        </NavLink>
        <NavLink to="#" className="search">
          <FiSearch
            onClick={searchIt}
            id="search"
            style={{ fontSize: '1.7rem', strokeWidth: '3px', stroke: 'white' }}
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
    border-bottom-right-radius: 25px;

    @media (max-width: 500px) {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 999;
    }
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
export default NavBar;
