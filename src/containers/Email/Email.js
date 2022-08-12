import axios from "axios";
import React, { useReducer } from "react";
import { formReducer } from "../../Global files/formReducer";

export default function Email() {
  const [form, setForm] = useReducer(formReducer, {
    email: "",
    message: "",
    subject: "",
    name: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(
      "https://food-order-narenthar.herokuapp.com/auth/sendmail",
      form
    );
    console.log(form);
  };

  return (
    <div className="container">
      <div className="row">
        <h1>SignUp</h1>
        <div className="col-lg-4">
          <form onSubmit={handleSubmit}>
            {/* email */}
            <div className="d-flex flex-column gap-0 mt-1">
              <label htmlFor="firstName">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                id=""
                required
                onChange={setForm}
              />
            </div>
            {/* message */}
            <div className="d-flex flex-column gap-0 mt-1">
              <label htmlFor="email">Message</label>
              <input
                type="text"
                name="message"
                value={form.message}
                id=""
                required
                onChange={setForm}
              />
            </div>
            {/* subject */}
            <div className="d-flex flex-column gap-0 mt-1">
              <label htmlFor="email">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                id=""
                required
                onChange={setForm}
              />
            </div>
            {/* name */}
            <div className="d-flex flex-column gap-0 mt-1">
              <label htmlFor="password">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                id=""
                required
                onChange={setForm}
              />
            </div>
            {/* Button */}
            <div className="d-flex flex-column gap-1 mt-2">
              <button type="submit">Submit</button>
              <button type="reset">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
