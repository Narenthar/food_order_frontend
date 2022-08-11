// import files
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

// Admin Home Page
export default function AdminHome() {
  // navigate to page
  const navigate = useNavigate();
  // admin authToken
  const adminauthToken = window.localStorage.getItem("adminauthToken");
  return (
    <div className="container">
      <AdminNavbar />
      <div className="text-center">
        <h6 className="MainContent_Text danger fw-bold">-Admin Dashboard</h6>
      </div>
      {/* if admin authToken not available for local storage redirect to admin login page*/}
      {adminauthToken && (
        <div className="row mt-4 m-3 mx-auto justify-content-center">
          <div className="col-sm-6 col-lg-6 col-md-5 mx-auto">
            <div className="d-flex gap-2 justify-content-ceter mt-5">
              <Link to="/userList" className="text-decoration-none">
                <h6 className="text-center shadow-lg p-4 rounded-4 fw-bold warning">
                  {" "}
                  <span
                    class="iconify danger"
                    data-icon="clarity:users-solid"
                    data-width="40"
                  ></span>{" "}
                  <br /> User List
                </h6>
              </Link>
              <Link to="/foodList" className="text-decoration-none">
                {" "}
                <h6 className="text-center shadow-lg p-4 rounded-4 fw-bold warning">
                  <span
                    class="iconify danger"
                    data-icon="fa6-solid:bowl-food"
                    data-width="40"
                  ></span>
                  <br /> Food List
                </h6>
              </Link>
              <Link to="/orderList" className="text-decoration-none">
                {" "}
                <h6 className="text-center shadow-lg p-4 rounded-4 fw-bold warning">
                  <span
                    class="iconify danger"
                    data-icon="entypo:shopping-cart"
                    data-width="40"
                  ></span>
                  <br />
                  Order List
                </h6>
              </Link>
            </div>
            <div className="mt-3 MainContent_Text">
              <h4 className="fw-bold">
                Food Tastes better when you <br /> eat it with your family
              </h4>
            </div>
          </div>
          <div className="col-sm-6 col-lg-6 col-md-5 mx-auto">
            <h1 className="fw-bold danger">China Town</h1>
            <p className="fw-bold">
              <span
                class="iconify danger"
                data-icon="fa6-solid:truck-fast"
              ></span>{" "}
              Fast Delivery & Enjoy Delicious Food
            </p>
            <img
              src="https://www.pngmart.com/files/21/Food-Delivery-Scooter-PNG-Isolated-HD-Pictures.png"
              className="w-75 mt-2"
              alt=""
            />
          </div>
        </div>
      )}
      {!adminauthToken && navigate("/login")}
    </div>
  );
}
