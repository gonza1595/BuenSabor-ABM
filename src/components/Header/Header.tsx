import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import * as Icon from "react-bootstrap-icons";
import logo from "../../assets/images/Buen sabor logo 1.png";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar expand="lg" className="border border-dark border-2">
        <Navbar.Brand onClick={() => navigate("/")}>
          <img src={logo} alt="Cargando..." className="img-fluid px-5" />
        </Navbar.Brand>
        <Navbar.Collapse id="navbarScroll" className="position-relative">
          <Nav
            className="me-auto my-2 my-lg-0 position-absolute top-50 end-0 translate-middle-y px-5"
            style={{ maxHeight: "100px" }}
          >
            <NavDropdown
              title={<Icon.PersonCircle size={32} />}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">Editar Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">Usuarios</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Rubros</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Productos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">Cerrar Sesion</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
