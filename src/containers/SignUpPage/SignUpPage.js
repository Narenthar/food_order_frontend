// import files
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// SignUp Component
export default function SignUpPage() {
  // navigate function
  const navigate = useNavigate();

  // Validation Schema
  const SignupSchema = Yup.object().shape({
    fullname: Yup.string().required(),
    contactnumber: Yup.number().required().positive().integer(),
    email: Yup.string().email().required(),
    password: Yup.string().required("Please enter your password"),
    cPassword: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
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
      <div className="row justify-content-center m-2">
        <div className="col-sm-4 col-md-6 col-lg-4 p-3 rounded-5 shadow-lg p-4">
          {/* Formik validation */}
          <Formik
            initialValues={{
              fullname: "",
              contactnumber: "",
              email: "",
              password: "",
              cPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              const form = {
                email: values.email,
                message: `Registration Successfully <br/>
                <br/>
                Best Wishes!!! <br/>
                NoodleCountry Restaurant
                `,
                subject: "Registration",
                name: `"Hi", ${values.fullname}`,
              };
              try {
                // Register api call
                await axios.post(`${ProductAPI}/auth/register`, values);
                // send mail to user api call
                await axios.post(`${ProductAPI}/auth/sendmail`, form);
                navigate("/login");
                toast.success("Registration Successfull");
              } catch ({ response: { data } }) {
                toast.error(data.error);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="d-flex flex-column gap-2 text-center">
                <h4 className="MainContent_Text">Real Food Right To You</h4>
                <div className="text-center">
                  {" "}
                  <img
                    src="https://www.pngall.com/wp-content/uploads/5/Chinese-Noodles-PNG-File-Download-Free.png"
                    className="w-50"
                    alt=""
                  />
                </div>
                {/* Full name */}
                <div>
                  <Field
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    className="form-control"
                  />
                </div>
                {errors.fullname && touched.fullname ? (
                  <span className="text-danger text-start">
                    *{errors.fullname}*
                  </span>
                ) : null}

                {/* Contact number */}
                <div>
                  <Field
                    type="number"
                    name="contactnumber"
                    className="form-control"
                    placeholder="Mobile Number"
                  />
                </div>
                {errors.contactnumber && touched.contactnumber ? (
                  <span className="text-danger text-start">
                    *{errors.contactnumber}*
                  </span>
                ) : null}

                {/* Email */}
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                  />
                </div>
                {errors.password && touched.password ? (
                  <span className="text-danger text-start">
                    *{errors.password}*
                  </span>
                ) : null}

                {/* Confirm Password */}
                <div>
                  <Field
                    type="password"
                    name="cPassword"
                    placeholder="Confirm Password"
                    className="form-control"
                  />
                </div>
                {errors.cPassword && touched.cPassword ? (
                  <span className="text-danger text-start">
                    *{errors.cPassword}*
                  </span>
                ) : null}

                {/* submit Button */}
                <button
                  type="submit"
                  className="btn btn-outline-dark warning fw-bold"
                >
                  Sign Up
                </button>
                <p>
                  Already a User?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Login
                  </Link>{" "}
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
