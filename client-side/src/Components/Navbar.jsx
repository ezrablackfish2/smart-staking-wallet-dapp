import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import WalletConnectBtn from "./WalletConnectBtn";

import logo from "../Assets/img/logo.png";

function NavbarScrool() {
  return (
    <Navbar
      expand="sm"
      className="bg-body-tertiary"
      bg="myNavbar"
      data-bs-theme="dark"
      style={{ padding: "0 20px" }}
    >
      <Container fluid>
        <Navbar.Brand href="#" className="navbar-brand">
          <img src={logo} alt="logo" width={"90px"} />
          <h1 style={{ marginLeft: "1rem" }}>Smart Staking Wallet</h1>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>

          <WalletConnectBtn></WalletConnectBtn>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarScrool;
