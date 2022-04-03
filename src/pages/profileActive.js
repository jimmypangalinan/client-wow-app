import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { UserContextToken } from "../context/useContext";
import NavbarUserMobile from "./components/navbarMobile";

import "../style/profileActive.css"

// assets
import Gender from "../assets/gender.png";
import Phone from "../assets/phone.png";
import Mail from "../assets/mail.png";
import Map from "../assets/map.png";
import Foto from "../assets/foto.png";

// import profile
import Profile from "./components/profile";
import EditProfile from "./components/editProfile";

function ProfileActive() {
  const [state, dispatch] = useContext(UserContextToken);
  console.log(state);
  const navigate = useNavigate();

  function exploreBook() {
    navigate("/afterlogin");
  }

  //profile
  const [profile, setProfile] = useState([]);

  const getProfile = async () => {
    try {
      const response = await API.get("/profile");
      setProfile(response.data.dataProfiles);
      // getProfile();
    } catch (error) {}
  };

  useEffect(() => {
    getProfile();
  }, []);

  console.log(profile);

  // mylist
  const [myList, setMyList] = useState([]);

  const getMyList = async () => {
    try {
      const response = await API.get("/myLists");
      setMyList(response.data.myListExis);
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    getMyList();
  }, []);

  console.log(myList);

  return (
    <div>
      <div className="container-fluid">
        <div className="d-sm-none">
          <NavbarUserMobile />
        </div>
        <div className="row">
          <div className="col-3 position-relative d-none d-sm-block">
            <div className="position-fixed  ms-5 ps-3 ">
              <Profile />
            </div>
          </div>
          <div className="col col-lg-9" id="premium" >
            <div className="row ms-2">
              <div className="position-sticky sticky-top">
                <h2 className="py-4 fw-bold">Profile</h2>
              </div>
            </div>
            <div className="row me-3">
              <div className="row ms-4 rounded me-3 profileBar" style={{ backgroundColor: "#FFD9D9", height: 400}}>
                <div className="col col-lg-6 offset-1  ms-lg-4 pt-5 pb-3">

                  <div className="d-flex">
                    <div className="mt-1 ">
                      <img src={Mail} alt="" width={40} />
                    </div>
                    <div className="ms-4">
                      {profile ? (
                      <p className="fw-bold">{state.user.email}</p>
                      ) : (
                      <p className="fw-bold">null</p>
                      )}
                      <p>email</p>
                    </div>
                  </div>

                  <div className="d-flex my-1">
                    <div className="mt-2">
                      <img src={Gender} alt="" width={40} />
                    </div>
                    <div className="ms-4">
                      <h6 className="fw-bold">
                        {profile ? (
                          <span>{profile.gender}</span>
                        ) : (
                          <span>Null</span>
                        )}
                      </h6>
                      <p>Gender</p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="mt-2">
                      <img src={Phone} alt="" width={40} />
                    </div>
                    <div className="ms-4">
                      <h6 className="fw-bold">
                        {profile ? (
                          <span>{profile.phone}</span>
                        ) : (
                          <span>Null</span>
                        )}
                      </h6>
                      <p>Phone</p>
                    </div>
                  </div>

                  <div className="d-flex mt-1">
                    <div className="mt-2">
                      <img src={Map} alt="" width={40} />
                    </div>
                    <div className="ms-4">
                      <h6 className="fw-bold">
                        {profile ? (
                          <span>{profile.address}</span>
                        ) : (
                          <span>Null</span>
                        )}
                      </h6>
                      <p>Address</p>
                    </div>
                  </div>

                </div>

                <div className="col col-lg-4 offset-1" >
                  <div className="col mt-5 bg-info "  >
                    {profile ? (
                      <img
                        src={`http://localhost:5000/uploads/profile/${profile.image}`}
                        className="img-fluid shadow w-100"
                        style={{height:230}}
                      />
                    ) : (
                      <img
                        src={Foto}
                        className="img-fluid shadow"
                      />
                    )}
                  </div>
                  <div className="row pt-4 ">
                    <EditProfile />
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex my-4 ">
              <div className="col-6 ms-lg-0" >
                <h2 className="fw-bold ms-3 ">My List Book</h2>
              </div>
              <div className="col-6 pe-4 text-end">
                <button className="btn btn-danger " onClick={exploreBook}>
                  Explore Book
                </button>
              </div>
            </div>

            <div className="row  ms-lg-3 me-2">
                {myList.map((item, index) => {
                  return (
                    <div
                      className="col-6 col-lg-3 text-wrap"
                      item={item}
                      key={item.idBook}
                      onClick={() => {
                        navigate(`/detailBooks/${item.idBook}`);
                      }}
                    >
                      <img
                        src={`http://localhost:5000/uploads/cover/${item.product.cover}`}
                        alt=""
                        className="img-fluid shadow  mx-auto w-100"
                        style={{ height: 390, borderRadius: 8 }}
                      />
                      <h5 className="my-2">{item.product.title}</h5>
                      <p>{item.product.author}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileActive;
