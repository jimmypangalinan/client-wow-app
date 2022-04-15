import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { UserContextToken } from "../../context/useContext";
import { UserContextModal } from "../../context/useContextModal";

function SignUp() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const [token, setToken] = useContext(UserContextToken);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const { fullName, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);
      console.log("ini res" + response);

      setToken({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      // Notification
      if (response.data.status == "success...") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
      navigate("/afterlogin");
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Input field cannot be empty !!
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };


  // modal
  const [state, dispatch] = useContext(UserContextModal);
  const closeModalSignUp = () => {
    dispatch({
      type: "SHOW",
      payload: {
        signIn: false,
        signUp: false,
      },
    });
  };

  const showModalSignUp = () => {
    dispatch({
      type: "SHOW",
      payload: {
        signIn: false,
        signUp: true,
      },
    });
  };

  const showModalSignInHere = () => {
    dispatch({
      type: "SHOW",
      payload: {
        signIn: true,
        signUp: false,
      },
    });
  };

  return (
    <div>
      <Modal
        show={state.show.signUp}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={closeModalSignUp}
      >
        <Form className="p-4" onSubmit={handleSubmit}>
          <h3 className="fw-bold py-3" style={{fontSize:40}}>Sign Up</h3>
          {message && message}
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={password}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              value={fullName}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="danger shadow-none" type="submit">
              Sign Up
            </Button>
          </div>
          <div className="text-center mt-2">
            <p>
              Already have an account ? Klik{" "}
              <span
                className="text-decoration-none text-black fw-bold "
                onClick={showModalSignInHere}
                style={{ cursor: "pointer" }}
              >
                Here
              </span>
            </p>
          </div>
        </Form>
      </Modal>
      <Button variant="danger px-5 fw-bold shadow-none " onClick={showModalSignUp}>
        Sign Up
      </Button>
    </div>
  );
}

export default SignUp;
