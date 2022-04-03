import React, { useEffect, useState } from "react";
import { API } from "../../config/api";
import { Button, Modal, Form, Select, Alert } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditProfile() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    gender: "",
    phone: "",
    address: "",
    image: "",
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
     
      const formData = new FormData();
      formData.set("gender", form.gender);
      formData.set("phone", form.phone);
      formData.set("address", form.address);
      formData.set("image", form.image[0], form.image[0].name);

      const response = await API.patch(`/updateProfile`, formData, config);
      
     
      if (response.data.status == "Success") {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success Update Profile',
          text: "Please don't repeat submit again !",
          showConfirmButton: false,
          timer: 4000
        })
      } 
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ops... , Something Wrong, Make sure fill all filled ',
        showConfirmButton: false,
        timer: 3000
      })
    }
  };

  const [profile, setProfile] = useState([]);
  const getProfile = async () => {
    try {
      const response = await API.get("/profile");
      setProfile(response.data.dataProfiles);
    } catch (error) {}
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          setShow(false);
        }}
      >
        <Form className="p-4" onSubmit={handleSubmit}>
          <h3 className="fw-bold py-3">Edit Profile</h3>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Select
              name="gender"
              onChange={handleChange}
              aria-label="Default select example"
            >
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control
              type="text"
              name="phone"
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <textarea
              type="text-area"
              name="address"
              onChange={handleChange}
              placeholder="Address"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <input
              class="form-control"
              type="file"
              name="image"
              onChange={handleChange}
              id="formFile"
              title="Photo Profile"
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="danger" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
      <Button
        variant="danger px-5 d-grid w-100  mx-auto"
        onClick={() => {
          setShow(true);
          Navigate("/profileActive")
        }}
      >
        Edit Profile
      </Button>
    </div>
  );
}

export default EditProfile;
