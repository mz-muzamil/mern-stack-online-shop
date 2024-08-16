import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";

const Header = () => {
  const cartCount = useSelector((store) => store.cart.totalItems);

  return (
    <header className="header">
      <Navbar expand="lg" className="bg-primary py-3">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src="/logo.png" alt="logo" style={{ height: 50 }} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="d-flex justify-content-end">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
              <Link className="nav-link text-white" to="/">
                Shop
              </Link>
              <Link className="nav-link text-white" to="/cart">
                Cart {cartCount}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
