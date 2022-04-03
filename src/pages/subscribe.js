import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Alert, Modal } from "react-bootstrap";
import { API } from "../config/api";
import { UserContextToken } from "../context/useContext";
import NavbarUserMobile from "./components/navbarMobile";
import Swal from "sweetalert2";

// assets
import Wow from "../assets/wow.png";
import Attach from "../assets/attach.png";

// import profile
import Profile from "../pages/components/profile";

function Subscribe() {

  const [form, setForm] = useState({
    transferProof: "",
    accountNumber: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      console.log(form);

      const formData = new FormData();
      formData.set("accountNumber", form.accountNumber);
      formData.set(
        "transferProof",
        form.transferProof[0],
        form.transferProof[0].name
      );
      

      console.log(formData);
      const response = await API.post("/transaction", formData, config);
      console.log(response);
      if (response.status == 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success to add transaction',
          text: "Wait for admin to confirm your subscribe!",
          showConfirmButton: false,
          timer: 2000
        })
      } else if (response.status == 201) {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'You still have an unfinished transaction',
            text: "Wait for admin to confirm your subscribe!",
            showConfirmButton: false,
            timer: 2000
          })
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ops... , Something Wrong',
        showConfirmButton: false,
        timer: 3000
      })
      console.log(error);
    }
  };

  ////////////////////////

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleToShowPremium = () => setShow(true);
  const handleToHidePremium = () => {
    setShow(false);
    // navigate("/afterlogin");
  };

  /////////////////////

  return (
    <div>
      <Modal show={show} onHide={handleToHidePremium} className="mt-5">
        <div className="py-3 text-center">
          <p className="fw-bold my-3 mx-5 text-success">
            Thank you for subscribing to premium, your premium package will be
            active after our admin approves your transaction, thank you
          </p>
        </div>
      </Modal>
      <div className="container-fluid">
        <div className="d-sm-none">
          <NavbarUserMobile />
        </div>
        <div className="row">
          <div className="col-3 position-relative d-none d-sm-block">
            <div className="position-fixed ms-5 ps-3 ">
              <Profile />
            </div>
          </div>
          <div
            className="col col-lg-9 d-flex justify-content-center align-items-center "
            id="premium"
            style={{ height: "100vh" }}
          >
            <div className="">
              <div className=" text-center">
                <h1 className="mb-5">Premium</h1>
                <h5 className="mx-2 ">
                  Pay now and access all the latest books from
                  <img src={Wow} alt="" />
                </h5>
                <h3 className="my-3">
                  <img src={Wow} alt="" /> : 082298937
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="col-10 offset-1 ">
                    <Form.Control
                      type="number"
                      placeholder="Input Your Account Number"
                      name="accountNumber"
                      onChange={handleChange}
                    />
                  </div>
                  
                  <label className="col-10 border border-danger mt-3 ps-3 py-2 fw-bold text-start text-danger">
                    Attache proof of transfer
                    <input
                      type="file"
                      className="fileInput d-none"
                      name="transferProof"
                      onChange={handleChange}
                    />
                    <img src={Attach} alt="" className="float-end pe-3" />
                  </label>
                  
                  <div className="col-10 offset-1 d-grid gap-2 py-5">
                  {/* {message && message} */}
                    <button
                      className="btn btn-danger"
                      type="submit"
                      // onClick={handleToShowPremium}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
