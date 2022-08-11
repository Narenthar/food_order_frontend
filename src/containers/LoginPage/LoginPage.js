// import files
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductAPI } from "../../Global files/ProductsAPI";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Login Component
export default function LoginPage() {
  // navigate function
  const navigate = useNavigate();

  // Login Schema
  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required("Please enter your password"),
  });

  return (
    <div className="container">
      <nav class="navbar bg-white">
        <div class="container">
          <span class="navbar-brand mb-0 h1">
            <Link class="text-decoration-none fw-bold danger" to="/">
              China Town
            </Link>{" "}
          </span>
        </div>
      </nav>
      <div className="row justify-content-center mt-5 m-2">
        <div className="col-sm-4 col-md-6 col-lg-4 rounded-5 shadow-lg p-4 text-center">
          <h5 className="text-center">Let's get started</h5>

          <img
            src="data:image/png;base64,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"
            className="w-50 mb-2"
            alt=""
          />
          {/* Formik validation */}
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              // api call
              try {
                const {
                  data: { authToken },
                } = await axios.post(`${ProductAPI}/auth/login`, values);
                console.log(values);
                window.localStorage.setItem("authToken", authToken);
                window.localStorage.setItem("email", values.email);
                navigate("/products");
                toast.success("Login Successfully");
              } catch ({ response: { data } }) {
                toast.error(data.error);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="d-flex flex-column gap-2">
                  {/* email */}
                  <div>
                    <Field
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <span className="text-danger text-start">
                      *{errors.email}*
                    </span>
                  ) : null}
                  {/* Password */}
                  <div>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  {errors.password && touched.password ? (
                    <span className="text-danger text-start">
                      *{errors.password}*
                    </span>
                  ) : null}
                  {/* submit button */}
                  <div className="">
                    <button
                      type="submit"
                      className="w-100 btn btn-outline-dark warning fw-bold"
                    >
                      Login
                    </button>
                    <p className="text-start mt-2">
                      <Link
                        to="/forget-password"
                        className="text-decoration-none"
                      >
                        ForgetPassword?
                      </Link>
                    </p>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <p className="text-end">
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
