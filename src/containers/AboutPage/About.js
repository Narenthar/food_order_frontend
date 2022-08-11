// import files
import React from "react";
import { Link } from "react-router-dom";

// About Page
export default function About() {
  return (
    <div>
      {/* Navbar */}
      <nav class="navbar bg-white">
        <div class="container">
          <span class="navbar-brand mb-0 h1">
            <Link class="text-decoration-none fw-bold danger" to="/">
              China Town
            </Link>{" "}
          </span>
        </div>
      </nav>
      <div className="row mt-4 justify-content-center">
        {/* About img */}
        <div className="col-sm-6 text-end">
          <img
            className="w-50"
            src="https://i.pinimg.com/originals/0e/54/9b/0e549b5aed444afa9205521f80e6262e.png"
            alt="noodles"
          />
        </div>
        {/* About content */}
        <div className="col-sm-6 px-5">
          <p className="danger fw-bold">- About Us</p>
          <h2 className="MainContent_Text">Enjoy goodness in every bite</h2>
          <p className="text-secondary">
            SPICY | VEGETARIAN Vegetarian excludes meat and fish | GLUTEN
            SENSITIVE Made without gluten-containing ingredients but potential
            for cross-contact exists | LOW CALORIE Less than 500 calories
          </p>
        </div>
      </div>
    </div>
  );
}
