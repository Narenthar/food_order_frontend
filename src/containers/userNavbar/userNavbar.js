// import files
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// user Navbar page
export default function UserNavbar() {
  // authToken get form localStorage
  const email = window.localStorage.getItem("email");
  const name = email.substr(0, email.indexOf("@"));

  // navigate to page
  const navigate = useNavigate();
  // logout function
  const Logout = () => {
    window.localStorage.clear();
    navigate("/login");
    toast.success("Logout Successfully");
  };
  // quantity get from redux
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-white text-center mt-1">
        <div class="container">
          <Link class="navbar-brand fw-bold warning" to="/">
            China Town
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
              <li class="nav-item">
                <Link
                  className="btn btn-outline-light bg-white border-0 fw-bold text-decoration-none text-dark MainContent_Text"
                  to="/products"
                >
                  Noodles
                </Link>
              </li>
              <li class="nav-item dropdown fw-bold text-dark MainContent_Text">
                <span
                  class="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {name}
                </span>
                <ul class="dropdown-menu text-center">
                  <li>
                    <Link
                      className="text-decoration-none text-dark MainContent_Text"
                      to="/myorders"
                    >
                      MyOrders
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-decoration-none text-dark MainContent_Text"
                      to="/"
                      onClick={Logout}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <button
                  type="button"
                  class="btn btn-outline-light danger border-0 position-relative"
                  onClick={() => navigate("/cart")}
                >
                  <span
                    class="iconify"
                    data-icon="el:shopping-cart-sign"
                    data-width="30"
                  ></span>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill warning">
                    {quantity}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
