import React, { useState, useEffect } from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import NavbarUser from "../pages/components/navbarUser";
import NavbarUserMobile from "./components/navbarMobile";

const ReadBook = () => {

  const { id } = useParams();

  // state acomodate book for read
  const [path, setPath] = useState();
  const [read, setRead] = useState({});
  
  const getproduct = async () => {
    try {

      const response = await API.get(`/book/${id}`);

      setRead(response.data.book.data);
      setPath(response.data.book.path);

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
          url={"https://res.cloudinary.com/dv167pbfi/raw/upload/v1649908187/wow-app/alice_in_the__wonderland_z8vszr.epub"}
          // url={ path + `${read.bookFile}`}
        />
      </div>
    </div>
  );
};

export default ReadBook;
