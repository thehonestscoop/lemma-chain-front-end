import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Nav fill tabs>
      <NavItem>
        <NavLink to="/create-account" tag={RRNavLink}>
          Create Account
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/login" tag={RRNavLink}>
          Login
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/create-ref" tag={RRNavLink}>
          Create Ref
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default NavBar;
