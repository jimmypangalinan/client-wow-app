import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Navbar, Dropdown } from "react-bootstrap";
import { UserContextToken } from "../../context/useContext";
import "../../style/navbar.css";

// assets
import Logo from "../../assets/icon-wow.png";
import IconProfile from "../../assets/icon-people.png";
import IconAddBook from "../../assets/add-book-icon.png";
import IconTransaction from "../../assets/transaction.png";
import IconLogOut from "../../assets/logout-icon.png";
import Books from "../../assets/books.png";

function NavbarComponent() {
  const navigate = useNavigate();

  function handleToAddBook() {
    navigate("/addBook");
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
              onClick={() => {
                navigate("/transaction");
              }}
            />
          </Navbar.Brand>
          <Navbar.Brand>
            <Dropdown className="toggle">
              <Dropdown.Toggle variant="" className="shadow-none">
                <img src={IconProfile} className="d-inline-block align-top" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="mt-2 dropdown-menu-center">
                <Dropdown.Item className="fw-bold" onClick={handleToAddBook}>
                  <img src={IconAddBook} className="me-3 my-2" />
                  Add Book
                </Dropdown.Item>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() => {
                    navigate("/transaction");
                  }}
                >
                  <img src={IconTransaction} className="me-3 my-2" style={{width:30}} />
                  Transaction
                </Dropdown.Item>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {/* <Dropdown.Item
                  className="fw-bold"
                  onClick={() => {
                    navigate("/complainAdmin");
                  }}
                >
                  <img src={IconTransaction} className="me-3 my-2" />
                  Complain
                </Dropdown.Item>
                <li>
                  <hr className="dropdown-divider" />
                </li> */}
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() => {
                    navigate("/product");
                  }}
                >
                  <img src={Books} className="me-3 my-2" style={{width:30}} />
                  Books
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

export default NavbarComponent;
