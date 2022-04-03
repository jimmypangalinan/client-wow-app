import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Navbar, Dropdown } from "react-bootstrap";
import { UserContextToken } from "../../context/useContext";
import "../../style/navbar.css";

// assets
import Logo from "../../assets/icon-wow.png";
import IconProfile from "../../assets/icon-people.png";
import IconAddBook from "../../assets/add-book-icon.png";
import IconLogOut from "../../assets/logout-icon.png";

function NavbarUser() {
  const navigate = useNavigate();

  function handleToAfterLogin() {
    navigate("/afterlogin");
  }

  // //////
  const [state, dispatch] = useContext(UserContextToken);

  function handleToLogOut() {
    dispatch({
      type: "LOGOUT",
      isLogin: false,
    });
    navigate("/");
  }

  return (
    <div>
      <Navbar bg="danger">
        <Container>
          <Navbar.Brand>
            <img
              src={Logo}
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              onClick={handleToLogOut}
            />
          </Navbar.Brand>
          <Navbar.Brand>
            <Dropdown className="toggle">
              <Dropdown.Toggle variant="" className="shadow-none">
                <img src={IconProfile} className="d-inline-block align-top" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="mt-2 dropdown-menu-center">
                <Dropdown.Item className="fw-bold" onClick={handleToAfterLogin}>
                  <img src={IconAddBook} className="me-3 my-2" />
                  Home
                </Dropdown.Item>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() => {
                    navigate("/complain");
                  }}
                >
                  <img src={IconAddBook} className="me-3 my-2" />
                  Chat Admin
                </Dropdown.Item>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <Dropdown.Item
                  className="fw-bold text-danger"
                  onClick={handleToLogOut}
                >
                  <img src={IconLogOut} className="me-3 my-2" />
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarUser;
