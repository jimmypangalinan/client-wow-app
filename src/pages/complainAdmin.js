import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import NavbarAdmin from "./components/navbarAdmin";
import Contact from "./components/complain/contact";
import Chat from "./components/complain/chat";

import dataContact from "../fakeData/contact";

export default function ComplainAdmin() {
  const [contact, setContact] = useState(null);

  return (
    <>
      <NavbarAdmin />
      <Container fluid style={{ height: "89.5vh" }}>
        <Row>
          <Col
            md={3}
            style={{ height: "89.5vh" }}
            className="px-3 border-end border-dark overflow-auto"
          >
            <Contact
              dataContact={dataContact}
              setContact={setContact}
              contact={contact}
            />
          </Col>
          <Col md={9} style={{ maxHeight: "89.5vh" }} className="px-0">
            <Chat contact={contact} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
