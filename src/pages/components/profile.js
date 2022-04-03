import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContextToken } from "../../context/useContext";
import { API } from "../../config/api";
import { Modal } from "react-bootstrap";

//assets
import Foto from "../../assets/profile.png";
import Icon from "../../assets/icon-wow.png";
import User from "../../assets/user.png";
import Bill from "../../assets/bill.png";
import Logout from "../../assets/logout.png";

function Profile() {
  const [profile, setProfile] = useState([]);
  const [show, setShow] = useState(false);
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

  console.log(profile);

  const [gambar, setGambar] = useState([]);
  console.log("this gambar" + gambar.image);
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
            // borderRadius: 200,
            clipPath: "circle()",
            height: 130,
            border: 200,
          }}
        /> : 
        <img
            src={`http://localhost:5000/uploads/profile/${gambar.image}`}
            // src={Foto}
            style={{
              // borderRadius: 200,
              clipPath: "circle()",
              height: 130,
              border: 200,
            }}
          />
        }
          
        </div>
        <div className="my-4">
          <h4 className="fw-bold mb-4">
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
        <hr />

        {profile.status === "Subscribe" ? (
            <div className="my-3 py-3 text-start mask" onClick={handleProfile} style={{ cursor: "pointer" }}>
              <img src={User} alt="" className="d-inline me-4" />
              <h4 className="d-inline ms-3 text-muted ">Profile</h4>
            </div>
            ) : ( 
            // <div className="my-3 py-3 text-start mask"   onClick={() => {setShow(false)}} style={{ cursor: "pointer" }}>
            //   <img src={User} alt="" className="d-inline me-4" />
            //   <h4 className="d-inline ms-3 text-muted ">Profile</h4>
            // </div>
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
