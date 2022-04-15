import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import styling
import "../style/landingPage.css";

// component
import SignIn from "./components/signIn.js";
import SignUp from "./components/signUp.js";

// assets
import Logo from "../assets/logo.png";

function LandingPage() {
  const navigate = useNavigate();
  
  const [modalShow, setModalShow] = useState(false);
 
  return (
    <div className="img-fluid bg-image  vh-100 bgimg">
      <div className="">
        <div className="col-lg-5 col">
          <img src={Logo} alt="" id="logo" className="float-end" />
          <div className="col offset-lg-3 bg-sm-info text-lg-start text-center">
            <p className="mb-5 " style={{ fontSize: 24 }}>
              Sign-up now and subscribe to enjoy all the cool and latest books
              <span className="text-danger">
                - The best book rental service provider in Indonesia
              </span>
            </p>
            <div className="d-flex justify-content-between pe-5 me-lg-5 ms-5 ms-lg-0 ">
              <SignUp show={modalShow} onHide={() => setModalShow(false)} />
              <SignIn show={modalShow} onHide={() => setModalShow(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
