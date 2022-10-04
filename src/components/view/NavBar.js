import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
  <Navbar bg="primary" variant="dark" className="p-2 d-flex justify-content-between rounded">
    <Navbar.Brand as={NavLink} to="/">Waiter.app</Navbar.Brand>
    <Nav>
      <Nav.Link as={NavLink} to="/">Home</Nav.Link>
    </Nav>
  </Navbar>
  )
};

export default NavBar;