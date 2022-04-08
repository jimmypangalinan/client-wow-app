import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { API } from "../config/api";
import Profile from "./components/profile";
import Banner from "../assets/banner.png";
import NavbarMobile from "../pages/components/navbarMobile";

// import styling
import "../style/afterLogin.css";

function AfterLogin() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  // const [state, dispatch] = useContext(UserContextToken);

  const [status, setStatus] = useState({});
  const getProfile = async () => {
    try {
      const response = await API.get("/user");
      setStatus(response.data.dataUser);
    } catch (error) {}
  };

  useEffect(() => {
    getProfile();
  }, []);

  console.log(status.status);
  // get books

  const [products, setProduct] = useState([]);
  const getproducts = async () => {
    try {
      const response = await API.get("/books");
      console.log(response);
      setProduct(response.data.data.books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <div>
      <Modal
        show={show}
        onHide={() => {
          navigate("/subscribe");
        }}
        className="mt-5"
      >
        <div className="py-3 text-center">
          <p className="fw-bold my-3 mx-5 text-danger">
            Please Make a Payment To Read The Latest Books
          </p>
        </div>
      </Modal>
      <div className="container-fluid">
        <div className="d-sm-none">
          <NavbarMobile />
        </div>
        <div className="row">
          <div className="col-3 position-relative d-none d-sm-block"  >
            <div className="position-fixed ms-5 ps-3 ">
              <Profile userStatus={getProfile} />
            </div>
          </div>
          <div className="col col-lg-9">

            <img src={Banner} alt="" className="w-100" />
            <div>
              <h1 className="ms-4 my-4 fw-bold">List Book</h1>
            </div>

            {status.status === "Not subscribe" ? (
              <div className="row ms-1 ms-lg-3 me-2 books" style={{ cursor: "pointer" }}>
                {products.map((item) => {
                  return (
                    <div
                      className="col-6 col-lg-3 text-wrap "
                      item={item}
                      key={item.id}
                      onClick={() => {
                        setShow(true);
                      }}
                    >
                      <img
                        src={`https://wow-app-server-v1.herokuapp.com/uploads/cover/${item.cover}`}
                        // src={`http://localhost:5000/uploads/cover/${item.cover}`}
                        alt=""
                        className="img-fluid shadow mx-auto w-100"
                        style={{ height: 390, borderRadius: 8 }}
                      />

                      <h5 className="my-2">{item.title}</h5>
                      <p>{item.author}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="row ms-1 ms-lg-3 me-2 books" style={{ cursor: "pointer" }}>
                {products.map((item) => {
                  return (
                    <div
                      className="col-6 col-lg-3  text-wrap"
                      item={item}
                      key={item.id}
                      onClick={() => {
                        navigate(`/detailBooks/${item.id}`);
                      }}
                    >
                      <img
                        src={`https://wow-app-server-v1.herokuapp.com/uploads/cover/${item.cover}`}
                        // src={`http://localhost:5000/uploads/cover/${item.cover}`}
                        alt=""
                        className="img-fluid shadow  mx-auto w-100"
                        style={{ height: 390, borderRadius: 8 }}
                      />

                      <h5 className="my-2">{item.title}</h5>
                      <p>{item.author}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AfterLogin;
