// import files
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Admin navbar
export default function AdminNavbar() {
  // navigate to page
  const navigate = useNavigate();
  // logout function
  const Logout = () => {
    // clear for admin authToken from localStorage
    window.localStorage.clear();
    // navigate to home page
    navigate("/");
    // success message
    toast.success("Logout Successfully");
  };

  return (
    <div>
      {/* Navbar */}
      <nav class="navbar navbar-expand-lg bg-white text-center mt-1">
        <div class="container">
          <Link class="navbar-brand fw-bold danger" to="/adminHome">
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
                <button
                  className="btn btn-outline-light bg-white border-0 fw-bold text-decoration-none text-dark MainContent_Text"
                  onClick={Logout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
