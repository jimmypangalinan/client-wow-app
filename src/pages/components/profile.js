import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContextToken } from "../../context/useContext";
import { API } from "../../config/api";
import { Modal } from "react-bootstrap";

//assets
import Foto from "../../assets/foto.png";
import Icon from "../../assets/icon-wow.png";
import User from "../../assets/user.png";
import Bill from "../../assets/bill.png";
import Logout from "../../assets/logout.png";

function Profile() {

  const navigate = useNavigate();

  // state show must pay to access
  const [show, setShow] = useState(false);

  //state user
  const [profile, setProfile] = useState([]);

  const getProfile = async () => {
    try {
      const response = await API.get("/user");
      setProfile(response.data.dataUser);

    } catch (error) {
      console.log(error);
     }
  };

  useEffect(() => {
    getProfile();
  }, []);


  // state gambar 
  const [path, setPath] = useState();
  const [gambar, setGambar] = useState([]);

  const getGambar = async () => {
    try {

      const response = await API.get("/profile");

      setGambar(response.data.dataProfiles);
      setPath(response.data.path);

    } catch (error) { }
  };

  useEffect(() => {
    getGambar();
  }, []);

  // for remove token if log out
  const [state, dispatch] = useContext(UserContextToken);

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
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        className="mt-5"
      >
        <div className="py-3 text-center">
          <p className="fw-bold my-3 mx-5 text-danger">
            Please Make a Payment To Read The Latest Books
          </p>
        </div>
      </Modal>
      <div className=" text-center">
        <div className="mt-5 mb-4">
          <img
            src={Icon}
            alt=""
            className="logo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/afterlogin");
            }}
          />
        </div>
        <div className="mb-4 py-4">
          {gambar.image == [] ?
            <img
              src={Foto}
              style={{
                clipPath: "circle()",
                height: 130,
                border: 200,
              }}
            /> :
            <img
              src={path + `profile/${gambar.image}`}
              style={{
                clipPath: "circle()",
                height: 130,
                border: 200,
              }}
            />
          }

        </div>
        <div className="my-4">
          <h4 className="fw-bold mb-4">
            {profile ?
              <span>{profile.fullName}</span>
              : <span>null</span>}
          </h4>
          <h5 className="text-danger fw-bold">
            {profile.status == "Subscribe" ? (
              <span className="text-success">Subscribe</span>
            ) : (
              <span>Not Subscribe Yet</span>
            )}
          </h5>
        </div>
        <hr />

        {profile.status === "Subscribe" ? (
          <div className="my-3 py-3 text-start mask" onClick={handleProfile} style={{ cursor: "pointer" }}>
            <img src={User} alt="" className="d-inline me-4" />
            <h4 className="d-inline ms-3 text-muted ">Profile</h4>
          </div>
        ) : (
          <span></span>
        )}

        <div className="my-3 py-3 text-start">
          <img src={Bill} alt="" className="d-inline me-4" />
          <h4
            className="d-inline ms-3 text-muted"
            onClick={handleSubsribe}
            style={{ cursor: "pointer" }}
          >
            Subscribe
          </h4>
        </div>
        <hr />
        <div
          className="my-3 py-4 text-start"
          onClick={handleLogOut}
          style={{ cursor: "pointer" }}
        >
          <img src={Logout} alt="" className="d-inline me-4" />
          <h4 className="d-inline ms-3 text-muted">Logout</h4>
        </div>
      </div>
    </div>
  );
}

export default Profile;
