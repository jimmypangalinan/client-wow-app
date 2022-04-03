import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import { Alert } from "react-bootstrap";
// component
import Profile from "../pages/components/profile";
import ReadBook from "../assets/read.png";
import AddMyList from "../assets/add-my-list.png";
import NavbarUserMobile from "./components/navbarMobile";

function Detailbooks() {
  const navigate = useNavigate();

  function handleReadBook() {
    navigate(`/readBook/${product.id}`);
  }

  const [product, setProduct] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    bookFile: "",
    cover: "",
  });

  const { id } = useParams();

  const getproduct = async () => {
    try {
      const response = await API.get(`/book/${id}`);
      setProduct(response.data.book);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getproduct();
  }, []);


  // add my list
  const [message, setMessage] = useState(null);
  const [button, setButton] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await API.post(`/addmylist/${id}`, config);
      console.log(response);

      if (response.data.status === "Delete") {
        const alert = (
          <Alert variant="danger" className="py-1">
            Book Success Delete on Mylist
          </Alert>
        );
        setMessage(alert);
        setButton(true);
      } else {
        const alert = (
          <Alert variant="success" className="py-1">
            Book Success Add on Mylist
          </Alert>
        );
        setMessage(alert);
        setButton(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="d-sm-none">
          <NavbarUserMobile />
        </div>
        <div className="row ">
          <div className="col-3 position-relative d-none d-sm-block">
            <div className="position-fixed ms-5 ps-3">
              <Profile />
            </div>
          </div>
          <div className="col col-lg-9">
            <div className="row ">
              <div className="col col-lg-4 ms-3 ms-lg-0 mt-3">
                <img
                  src={product.cover}
                  className="img-fluid  shadow"
                  style={{ borderRadius: 20, height: 550 }}
                />
              </div>
              <div className="col-lg-6 ms-3 mt-3">
                <h1 className="fw-bold">{product.title}</h1>
                <h4 className="text-muted">{product.author}</h4>
                <div>
                  <h3>Publication Date</h3>
                  <p className="text-muted">{product.publicationDate}</p>
                </div>
                <div>
                  <h3>Pages</h3>
                  <p className="text-muted">{product.pages}</p>
                </div>
                <div>
                  <h3 className="text-danger">ISBN</h3>
                  <p className="text-muted">{product.isbn}</p>
                </div>
              </div>
            </div>
            <div className="text-justify mx-3 ms-lg-0" style={{ textAlign: "justify" }}>
              <h3 className="mt-3 fw-bold">About This Book</h3>
              <p>{product.about}</p>
            </div>
           <div className="mx-3">
           {message && message}
           </div>
            <div className="d-flex justify-content-end">
              
              {/* <button
                className="btn btn-danger me-3 fw-bold"
                onClick={handleSubmit}
              >
                Add or Delete My List
                <img src={AddMyList} alt="" className="ms-3" />
              </button> */}

              {button ? (
                <button
                  className="btn btn-danger me-3 fw-bold"
                  onClick={handleSubmit}
                >
                  Add My List
                  <img src={AddMyList} alt="" className="ms-3" />
                </button>
              ) : (
                <button
                  className="btn btn-light me-3 fw-bold"
                  onClick={handleSubmit}
                >
                  Delete My List
                  <img src={AddMyList} alt="" className="ms-3" />
                </button>
              )}

              <button
                className="btn fw-bold"
                onClick={handleReadBook}
                style={{ backgroundColor: "#CDCDCD" }}
              >
                Read Book <img src={ReadBook} alt="" className="ms-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detailbooks;
