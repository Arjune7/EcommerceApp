import { NavLink, Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useAuth } from "../../Context/auth";
import { toast } from "react-hot-toast";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successful");
  };
  return (
    <>
      <Navbar bg="light" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand>
            {/* <GiShoppingCart size={30} style={{ marginRight: "1rem" }} /> */}
            🛒 Ecommerce App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <NavLink style={{ textDecoration: "none", color: "inherit" }} to="/">
                  Home
                </NavLink>
              </Nav.Link>
              <Nav.Link style={{ textDecoration: "none", color: "inherit" }}>
                <NavLink style={{ textDecoration: "none", color: "inherit" }} to="/category">
                  Category
                </NavLink>
              </Nav.Link>

              {!auth?.user ? (
                <>
                  <Nav.Link style={{ textDecoration: "none", color: "inherit" }}>
                    <NavLink style={{ textDecoration: "none", color: "inherit" }} to="/register">
                      Register
                    </NavLink>
                  </Nav.Link>
                  <Nav.Link style={{ textDecoration: "none", color: "inherit" }}>
                    <NavLink style={{ textDecoration: "none", color: "inherit" }} to="/login">
                      Login
                    </NavLink>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown title={auth?.user?.name} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      <NavLink style={{ textDecoration: "none", color: "inherit" }} to="/dashboard">
                        DashBoard
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
