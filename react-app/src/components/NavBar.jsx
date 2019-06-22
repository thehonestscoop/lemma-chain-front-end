import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="1">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/create-account" eventKey="3">
          Create Account
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/create-ref" eventKey="2">
          Create Ref
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/login" eventKey="3">
          Login
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
