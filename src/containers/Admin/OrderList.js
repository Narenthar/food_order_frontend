// import files
import React from "react";
import AdminNavbar from "./AdminNavbar";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// order List function
export default function OrderList() {
  // authToken
  const authToken = window.localStorage.getItem("authToken");
  // navigate to page
  const navigate = useNavigate();
  // user details state management
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  // get users details and api call
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/orders`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete user
  const deleteOrder = async ({ _id }) => {
    if (window.confirm(`Are You Sure Delete This order`)) {
      try {
        await axios.delete(`${ProductAPI}/orders/${_id}`, { _id });
        alert("Deleted Successfully");
        getUsers();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <AdminNavbar />
      <div className="container">
        <div className="d-flex justify-content-between mb-2 mt-2">
          {/* Search name */}
          <input
            type="text"
            className="mx-auto rounded-2 w-25 px-4"
            placeholder="Search Name"
            onChange={(event) => setQuery(event.target.value)}
          />
          <p className="text-center danger fw-bold mx-auto">
            -All Orders Information
          </p>
        </div>
        {/* orders list */}
        <div className="row table-responsive">
          <table className="text-center table">
            <thead className="bg-success bg-opacity-75 warning">
              <tr>
                <th>Order Id</th>
                <th>Status</th>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Date / Time</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            {isLoading && (
              <div className="">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                  alt=""
                />
              </div>
            )}
            <tbody className="bg-light">
              {users
                .filter((g) => g.token.card.name.toLowerCase().includes(query))
                .map((u, index) => {
                  return (
                    <tr key={index}>
                      <td>{u._id}</td>
                      <td className="text-primary fw-bold">{u.status}</td>
                      <td>{u.token.card.name}</td>
                      <td>
                        {u.token.card.address_line1},{" "}
                        {u.token.card.address_city}, {u.token.card.address_zip}
                      </td>
                      <td>{u.token.email}</td>
                      <td>
                        {u.date}-{u.time}
                      </td>
                      <td>{u.total}</td>
                      <td className="justify-content-center">
                        {/* order edit */}
                        <button
                          className="btn btn-outline-white border-0"
                          onClick={() =>
                            navigate("/editOrderList/edit/" + u._id)
                          }
                        >
                          <span
                            class="iconify warning"
                            data-icon="entypo:edit"
                          ></span>
                        </button>
                        {/* order info */}
                        <button
                          className="btn btn-outline-white border-0"
                          onClick={() => navigate("/orders/" + u._id)}
                        >
                          <span
                            class="iconify text-info"
                            data-icon="bi:info-circle-fill"
                          ></span>
                        </button>
                        {/* order delete */}
                        <button
                          className="btn btn-outline-white border-0"
                          onClick={() => deleteOrder(u)}
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

// user individual orders Information
export function OrdersInfo() {
  // navigate to page
  const navigate = useNavigate();

  // state management
  const { id } = useParams();
  const [orders, setOrders] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // get order details and api call
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
      <AdminNavbar />
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

// Edit FoodList
export function EditOrderList() {
  // state management
  const { id } = useParams();
  const [orders, setOrders] = useState(null);

  // edit orders & api call
  const editOrders = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/orders/${id}`);
      setOrders(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    editOrders();
  }, []);

  return (
    <div className="container">
      {orders ? (
        <EditOrderForm orders={orders} />
      ) : (
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
    </div>
  );
}

// Edit order form function
export function EditOrderForm({ orders }) {
  // navigate to page
  const navigate = useNavigate();

  // state management
  const [userId, setUserId] = useState(orders.userId);
  const [token, setToken] = useState(orders.token);
  const [product, setProduct] = useState(orders.product);
  const [total, setTotal] = useState(orders.total);
  const [status, setStatus] = useState(orders.status);

  // edit order details & api call
  const editfood = async () => {
    const updateFood = {
      userId: userId,
      token: token,
      product: product,
      total: total,
      status: status,
    };

    try {
      await axios.put(`${ProductAPI}/orders/${orders._id}`, updateFood);
      navigate("/orderList");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <AdminNavbar />
      <div className="row justify-content-center m-2 mt-5 mx-auto gap-3">
        <div className="col-sm-4 col-md-6 col-lg-4 p-3 rounded-5 shadow-lg p-4 mx-auto">
          <h5 className="text-center MainContent_Text">Delivery Status</h5>
          {/* user Id */}
          <input
            className="mt-2 form-control"
            value={userId}
            type="text"
            placeholder="userId"
            onChange={(event) => setUserId(event.target.value)}
          />
          {/* token */}
          <input
            className="mt-2 form-control"
            value={token}
            type="text"
            placeholder="token"
            onChange={(event) => setToken(event.target.value)}
          />
          {/* product */}
          <input
            className="mt-2 form-control"
            value={product}
            type="text"
            placeholder="Product"
            onChange={(event) => setProduct(event.target.value)}
          />
          {/* total */}
          <input
            className="mt-2 form-control"
            value={total}
            type="number"
            placeholder="Total"
            onChange={(event) => setTotal(event.target.value)}
          />
          {/* status */}
          <select
            className="mt-2 form-control"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option>order placed</option>
            <option>Food Prepared</option>
            <option>Ready to delivery</option>
            <option>Delivered</option>
          </select>
          {/* submit */}
          <button
            className="btn btn-outline-success fw-bold mt-2 form-control"
            onClick={editfood}
          >
            UPDATE
          </button>
        </div>
        <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
          <img
            src="https://theninehertz.com/wp-content/uploads/2020/04/food-delivery.gif"
            className="w-100"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
