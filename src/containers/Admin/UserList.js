// import files
import React from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { useNavigate, useParams } from "react-router-dom";

// All user List
export default function UserList() {
  // navigate to page
  const navigate = useNavigate();
  // user details state management
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // get users details and api call
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/users`);
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    getUsers();
  }, []);

  // delete user & api call
  const deleteUser = async ({ fullname, _id }) => {
    if (window.confirm(`Are You Sure Delete This User ${fullname}`)) {
      try {
        await axios.delete(`${ProductAPI}/users/${_id}`, { _id });
        alert("Deleted Successfully");
        getUsers();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <div className="d-flex justify-content-between mb-2">
          <input
            type="text"
            className="mx-auto rounded-2 w-25 px-4"
            placeholder="Search Name"
            onChange={(event) => setQuery(event.target.value)}
          />
          <p className="text-center danger fw-bold mx-auto">
            -All Users Information
          </p>
        </div>
        {/* user list table */}
        <div className="row table-responsive">
          <table className="text-center table">
            <thead className="bg-success bg-opacity-75 warning">
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Register Date / Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <div className="text-center">
              {" "}
              {isLoading && (
                <div className="">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                    alt=""
                  />
                </div>
              )}
            </div>
            <tbody className="bg-light">
              {users
                .filter((g) => g.fullname.toLowerCase().includes(query))
                .map((u, index) => {
                  return (
                    <tr key={index}>
                      <td>{u._id}</td>
                      <td>{u.fullname}</td>
                      <td>{u.contactnumber}</td>
                      <td>{u.email}</td>
                      <td>
                        {u.date} - {u.time}
                      </td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-outline-white border-0"
                          onClick={() => navigate("/users/" + u._id)}
                        >
                          <span
                            class="iconify text-info"
                            data-icon="bi:info-circle-fill"
                          ></span>
                        </button>

                        <button
                          className="btn btn-outline-white border-0"
                          onClick={() => deleteUser(u)}
                        >
                          <span
                            class="iconify danger"
                            data-icon="ant-design:delete-filled"
                          ></span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// user individual Information
export function UserInfo() {
  // navigate to page
  const navigate = useNavigate();
  // user state management
  const { id } = useParams();
  const [users, setUsers] = useState({});

  // user info & api call
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/users/${id}`);
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    getUserInfo();
  }, [id]);

  return (
    <div className="container">
      <AdminNavbar />
      <h6 className="text-center danger fw-bold mt-3">
        --User Personal Information
      </h6>
      <div className="row justify-content-center p-2">
        <div className="col mt-5 MainContent_Text">
          <h4>
            FullName: <span className="text-primary">{users.fullname}</span>
          </h4>
          <h4>
            Email: <span className="text-primary">{users.email}</span>
          </h4>
          <h4>
            Contact-Number:{" "}
            <span className="text-primary">{users.contactnumber}</span>
          </h4>
          <h4>
            Create-Date/Time:{" "}
            <span className="text-primary">
              {users.date} - {users.time}
            </span>
          </h4>
        </div>
        <div className="col">
          <img
            src="https://i.pinimg.com/originals/0a/f3/c9/0af3c9613761d2d2394d99312aeba397.gif"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
