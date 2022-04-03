import React, {useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Navbar, Container, Offcanvas, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap"
import { API } from "../../config/api";
import { UserContextToken } from "../../context/useContext";
import Logo from "../../assets/icon-wow.png";

function NavbarUserMobile() {
    const [profile, setProfile] = useState([]);
    const getProfile = async () => {
        try {
          const response = await API.get("/user");
          setProfile(response.data.dataUser);
          console.log(response);
        } catch (error) {}
      };

      useEffect(() => {
        getProfile();
      }, []);

      const [gambar, setGambar] = useState([]);
  const getGambar = async () => {
    try {
      const response = await API.get("/profile");
      setGambar(response.data.dataProfiles);
    } catch (error) {}
  };

  useEffect(() => {
    getGambar();
  }, []);
  console.log(gambar);
  //////////////////
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContextToken);
  console.log(state);

  function handleProfile() {
    navigate("/profileActive");
  }
  function handleSubsribe() {
    navigate("/subscribe");
  }

  function handleLogOut() {
    dispatch({
      type: "LOGOUT",
      isLogin: false,
    });
    navigate("/");
  }

  return (
    <div>
     <Navbar bg="light" expand={false}>
  <Container fluid >
    <Navbar.Brand href="#">  <Offcanvas.Title id="offcanvasNavbarLabel"> 
        <img
              src={Logo}
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              style={{width:60}}
              onClick={() => {
                navigate("/transaction");
                
              }} 
            />  <span className="ms-3 fw-bold text-danger">Read Epub Easy</span>
        </Offcanvas.Title> </Navbar.Brand>
    <Navbar.Toggle aria-controls="offcanvasNavbar" />
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header closeButton >
        <Offcanvas.Title id="offcanvasNavbarLabel"> 
        <img
              src={Logo}
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              style={{width:60}}
              onClick={() => {
                navigate("/transaction");
                
              }} 
            />  <span className="ms-3 fw-bold text-danger">Read Epub Easy</span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <div className="ms-3">
      <img
            src={`http://localhost:5000/uploads/profile/${gambar.image}`}
            style={{
              // borderRadius: 200,
              clipPath: "circle()",
              height: 150,
              border: 200,
            }}
          />
          <h4 className="fw-bold my-4">
            {profile ? <span>{profile.fullName}</span> : <span>null</span>}
          </h4>
          <h5 className="text-danger fw-bold">
            {profile.status == "Subscribe" ? (
              <span className="text-success">Subscribe</span>
            ) : (
              <span>Not Subscribe Yet</span>
            )}
          </h5>
        </div>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3 mb-3">
        <Button variant="info" onClick={handleProfile}>Profile </Button>
          <Button variant="warning" className="my-3" onClick={handleSubsribe}>Subscribe </Button>
          <Button variant="danger" onClick={handleLogOut}>Log Out </Button>
          </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>
    
    </div>
  );
}

export default NavbarUserMobile;
