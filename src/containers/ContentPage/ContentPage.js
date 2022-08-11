// import files
import React, { useEffect } from "react";
import "./ContentPage.css";
import image1 from "./Image/image1.png";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

// content page
export default function ContentPage() {
  const navigate = useNavigate();
  const user = localStorage.getItem("email");
  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [navigate, user]);
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-lg-5">
            <img className="w-100" src={image1} alt="pic" />
          </div>

          <div className="col-sm-6 col-lg-5">
            <h1 className="fw-bold danger">China Town</h1>
            <p className="danger fw-bold"></p>
            <h1 className="MainContent_Text mb-3">
              We Know How To Make Deliciousness Taste Great
            </h1>
            <p className="text-secondary">
              Choose healthy. Be strong. Live long.
            </p>
            {user ? (
              <Link
                to="/products"
                className="btn btn-outline-dark fw-bold danger"
              >
                Order Now
              </Link>
            ) : (
              <Link to="/login" className="btn btn-outline-dark fw-bold danger">
                Order Now
              </Link>
            )}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col text-center">
            <div>
              <h3 className="fw-bold MainContent_Text">CheckOut Our</h3>
            </div>
            <div className="d-flex justify-content-between gap-2">
              <div className="shadow-dg rounded-4 p-3 ">
                <span
                  class="iconify text-danger"
                  data-icon="maki:restaurant-seafood"
                  data-width="40"
                ></span>
                <h6 className="fw-bold warning">Many Varieties</h6>
              </div>
              <div className="shadow-dg rounded-4 p-3">
                <span
                  class="iconify text-secondary"
                  data-icon="emojione:green-book"
                  data-width="40"
                ></span>
                <h6 className="fw-bold warning">Great Menu</h6>
              </div>
              <div className="shadow-dg rounded-4 p-3">
                <span
                  class="iconify text-secondary"
                  data-icon="emojione-v1:pot-of-food"
                  data-width="40"
                ></span>
                <h6 className="fw-bold warning">Delicious Food</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
