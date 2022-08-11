// import files
import React, { useEffect } from "react";
import UserNavbar from "../userNavbar/userNavbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { useParams } from "react-router-dom";

// my orders page
export default function MyOrders() {
  // authToken
  const authToken = window.localStorage.getItem("authToken");

  // navigate to page
  const navigate = useNavigate();

  // user details state management
  const [myOrders, setMyOrders] = useState([]);

  // Search orders
  const [query, setQuery] = useState("");

  // Initial Loading Page
  const [isLoading, setIsLoading] = useState(true);

  // get userById from authToken
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = decodeURIComponent(
      atob(base64Url)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(base64);
  }
  let a = parseJwt(authToken);
  let userId = a._id;

  // get userById Orders
  const getUserById = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/orders/userId/${userId}`);
      setMyOrders(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Call function useEffect
  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div className="container text-center">
      <UserNavbar />
      <div className="container">
        <div className="d-flex justify-content-between mb-2">
          <input
            type="text"
            className="mx-auto rounded-2 w-25 px-4"
            placeholder="Search Order Id"
            onChange={(event) => setQuery(event.target.value)}
          />
          <p className="text-center danger fw-bold mx-auto">
            -MyOrders Information
          </p>
        </div>
        {/* my orders table */}
        <div className="row table-responsive">
          <table className="text-center table">
            <thead className="bg-success bg-opacity-75 warning">
              <tr>
                <th>Order Id</th>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
                <th>Amount</th>
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
              {myOrders
                .filter((g) => g._id.includes(query))
                .map((u, index) => {
                  return (
                    <tr key={index}>
                      <td>{u._id}</td>
                      <td className="text-success fw-bold">{u.status}</td>
                      <td>{u.date}</td>
                      <td>{u.time}</td>
                      <td>{u.total}</td>
                      <td className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn btn-outline-white border-0"
                          onClick={() => navigate("/userOrdersInfo/" + u._id)}
                        >
                          <span
                            class="iconify text-info"
                            data-icon="bi:info-circle-fill"
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

// order info
export function UserOrdersInfo() {
  // navigate to page
  const navigate = useNavigate();

  // state management
  const { id } = useParams();
  const [orders, setOrders] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // get order info
  const getOrderInfo = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/orders/${id}`);
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    getOrderInfo();
  }, [id]);

  return (
    <div className="container">
      <UserNavbar />
      {isLoading && (
        <div className="progress mt-3">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "75%" }}
          ></div>
        </div>
      )}
      <h6 className="text-center danger fw-bold mt-3">--User Orders details</h6>
      {/* order info table */}
      <div className="row table-responsive">
        <table className="text-center table">
          <thead className="bg-success bg-opacity-75 warning">
            <tr>
              <th>Food-Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.product &&
              orders.product.map((p, index) => {
                return (
                  <tr>
                    <td>{p._id}</td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>{p.price * p.quantity}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
