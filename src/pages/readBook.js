import React, { useState, useEffect } from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import NavbarUser from "../pages/components/navbarUser";
import NavbarUserMobile from "./components/navbarMobile";

const ReadBook = () => {
  const [read, setRead] = useState({});
  const { id } = useParams();
  const getproduct = async () => {
    try {
      const response = await API.get(`/book/${id}`);
      setRead(response.data.book);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getproduct();
  }, []);
  const ownStyles = {
    ...ReactReaderStyle,
    arrow: {
      ...ReactReaderStyle.arrow,
      color: "rgba(205, 205, 205, 0.7)",
    },
  };
  return (
    <div className="position-relative">
      <div className="d-sm-none">
          <NavbarUserMobile />
        </div>
      <div className="d-none d-sm-block">
        <NavbarUser />
      </div>
      <div style={{ height: "100vh", position: "relative" }}>
        <ReactReader
          styles={ownStyles}
          url={`https://wow-app-server-v1.herokuapp.com/uploads/books/${read.bookFile}`}
          // url={`http://localhost:5000/uploads/books/${read.bookFile}`}
        />
      </div>
    </div>
  );
};

export default ReadBook;
