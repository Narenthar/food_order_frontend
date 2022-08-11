// import files
import React, { useState } from "react";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import UserNavbar from "../userNavbar/userNavbar";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../redux/cartRedux";
import axios from "axios";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

// stripe key
const KEY = process.env.REACT_APP_STRIPE;

// cart function
export default function Cart() {
  // authtoken localStorage
  const authToken = window.localStorage.getItem("authToken");

  // get Id from authToken
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
  let email = a.email;

  // navigate to page
  const navigate = useNavigate();

  // state management
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // declere the variables
  const product = cart.products;
  const quantity = cart.quantity;
  const total = cart.total;

  // initial order status
  const status = "order placed";

  // remove from cart
  const handleRemove = () => {
    dispatch(removeProduct({ product, price: product.price, quantity, total }));
  };

  // payment function & api call
  async function handleToken(token, addresses) {
    // send to payment
    const response = await axios.post(`${ProductAPI}/checkout`, {
      token,
      product,
    });

    // send to orders from db
    await axios.post(
      `${ProductAPI}/orders`,
      { userId, token, product, total, status },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    // send mail to user template
    const form = {
      email: email,
      message: ` <table role="presentation" border="1" cellspacing="1" width="50%">
      <thead>
        <tr>
          <th>Food name</th>
          <th>Total amount</th>
        </tr>
      </thead>
      <tbody role="presentation" border="1" cellspacing="1" width="50%" align="center">
          <td>${product.map((x) => x.name)}</td>
          <td>${total}</td>
      </tbody>
    </table>
    <br/>
    Best Wishes!!! <br/>
    NoodleCountry Restaurant
    `,
      subject: "Orders",
      name: `"Hi", ${email}`,
    };

    // send Mail api call
    await axios.post(`${ProductAPI}/auth/sendmail`, form);

    // navigate to success page
    navigate("/success");
    if (response === 200) {
      navigate("/success");
      console.log("200");
    } else {
      console.log("error");
    }
  }

  return (
    <div className="container">
      <UserNavbar />

      <div className="row">
        {/* cart list */}
        <div className="col-lg-8">
          <div className="row">
            {product.map((product, index) => (
              <CartTemplate
                {...product}
                key={index}
                delbtn={
                  <button
                    onClick={handleRemove}
                    className="btn btn-outline-white border-0 danger"
                  >
                    <span
                      class="iconify"
                      data-icon="ant-design:delete-filled"
                    ></span>
                  </button>
                }
              />
            ))}
          </div>
        </div>
        {/* cart total */}
        <div className="col h-100 shadow-lg mt-2 rounded-3 text-center MainContent_Text m-2">
          <div className="p-3">
            <h4 className="fw-bold">Order summary</h4>
            <h6>
              Total Price:{" "}
              <span className="fw-bold text-success">
                ₹ {Math.round(total)}
              </span>
            </h6>
            <StripeCheckout
              name="China Town"
              billingAddress
              shippingAddress
              description={`Your amount is ₹ ${Math.round(total)}`}
              amount={Math.round(total) * 100}
              token={handleToken}
              currency="INR"
              stripeKey={KEY}
            >
              <button className="btn btn-outline-dark warning fw-bold">
                Checkout Now
              </button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </div>
  );
}

// cart template
function CartTemplate({ img, _id, name, quantity, price, delbtn }) {
  return (
    <div className="col-sm-5 col-md-6 MainContent_Text">
      <div class="card border-0 shadow-lg rounded-3 mx-auto text-center m-2">
        <div className="text-center">
          <img src={img} class="card-img-top w-50" alt="..." />
        </div>
        <div class="card-body">
          <h6 className="fw-bold text-secondary"> Name: {name}</h6>
          <h6 className="fw-bold text-secondary">Id: {_id}</h6>
          <h6 className="fw-bold text-secondary">Qty: {quantity}Nos</h6>
          <h6 className="fw-bold">
            Price: <span className="text-success">₹ {price * quantity}</span>
          </h6>
          <span className="delbtn">{delbtn}</span>
        </div>
      </div>
    </div>
  );
}
