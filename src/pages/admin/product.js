import React, { useState, useEffect } from "react";
import { API } from "../../config/api";
import Swal from "sweetalert2";

// component
import NavbarComponent from "../components/navbarAdmin";

function Product() {
    const [products, setProduct] = useState([]);
    const getproducts = async () => {
      try {
        const response = await API.get("/books");
        setProduct(response.data.data.books);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getproducts();
    }, []);

    //////////////////////
    const DeleteProduct = async (id) => {
      try {
        const response = await API.delete(`/book/${id}`);

        if (response.status == 201 ) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success to delete book',
            text: "Please don't repeat submit again !",
            showConfirmButton: false,
            timer: 4000
          })
          
        }
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ops..., Server error',
          showConfirmButton: false,
          timer: 3000
        })
        console.log(error)
      }
    };

  return (
    <div>
      <div>
        <NavbarComponent />
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div>
              <h1 className="ms-4 my-4 fw-bold">List Book</h1>
            </div>
              <div className="row ms-3 me-2" style={{ cursor: "pointer" }}>
                {products.map((item) => {
                  return (
                    <div
                      className="col-3 text-wrap "
                      item={item}
                      key={item.id}
                    >
                      <img
                        src={`https://wow-app-server-v1.herokuapp.com/uploads/cover/${item.cover}`}
                        // src={`http://localhost:5000/uploads/cover/${item.cover}`}
                        alt=""
                        className="img-fluid shadow mx-auto w-100"
                        style={{ height: 420, borderRadius: 8 }}
                      />

                      <h5 className="my-2">{item.title}</h5>
                      <p>{item.author}</p>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => DeleteProduct(item.id)}  
                      >Delete</button>
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

export default Product;
