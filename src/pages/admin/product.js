import React, { useState, useEffect } from "react";
import { API } from "../../config/api";

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
