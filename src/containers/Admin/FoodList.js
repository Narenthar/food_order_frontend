// import files
import React from "react";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { useEffect } from "react";
import { useReducer } from "react";
import { formReducer } from "../../Global files/formReducer";
import { useParams } from "react-router-dom";

// Food List
export default function FoodList() {
  const [query, setQuery] = useState("");
  // navigate to page
  const navigate = useNavigate();
  // user details state management
  const [foodList, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // get food details
  const getFoodList = async () => {
    try {
      // api call & state management
      const { data } = await axios.get(`${ProductAPI}/products`);
      setFoodList(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete food
  const deleteFood = async ({ name, _id }) => {
    // api call & state management
    if (window.confirm(`Are You Sure Delete This User ${name}`)) {
      try {
        await axios.delete(`${ProductAPI}/products/${_id}`, { _id });
        alert("Deleted Successfully");
        getFoodList();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    getFoodList();
  }, []);

  return (
    <div className="container">
      <AdminNavbar />
      <div className="d-flex justify-content-between mb-3 gap-0 mt-2 mx-auto mt-2">
        <input
          type="text"
          className="px-2 rounded-2 w-25"
          placeholder="Search food"
          onChange={(event) => setQuery(event.target.value)}
        />
        <h6 className="text-center fw-bold text-danger">
          --All Food Informations
        </h6>
        <button
          className="btn btn-outline-daek warning fw-bold"
          onClick={() => navigate("/addFoodList")}
        >
          Add Food
        </button>
      </div>
      <div className="row table-responsive">
        {/* food list Table */}
        <table className="text-center table">
          <thead className="bg-success bg-opacity-75 warning">
            <tr>
              <th>Image</th>
              <th>Product-Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Offer</th>
              <th>Description</th>
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
            {foodList
              .filter((g) => g.name.toLowerCase().includes(query))
              .map((u, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={u.img} alt="" className="w-25" />
                    </td>
                    <td className="text-start">{u._id}</td>
                    <td className="text-start">{u.name}</td>
                    <td>{u.price}</td>
                    <td>{u.rating}</td>
                    <td>{u.offer}</td>
                    <td className="text-start">{u.desc}</td>
                    <td>
                      <button
                        className="btn btn-outline-white border-0"
                        onClick={() => navigate("/editFoodList/edit/" + u._id)}
                      >
                        <span
                          class="iconify warning"
                          data-icon="entypo:edit"
                        ></span>
                      </button>
                      <button
                        className="btn btn-outline-white border-0"
                        onClick={() => deleteFood(u)}
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
  );
}

// Add Food function
export function AddFoodList() {
  // navigate to page
  const navigate = useNavigate();
  // state management
  const [base64code, setbase64code] = useState("");
  const [image, setImage] = useState("");

  // image handle function
  const imghandleSubmit = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };

  // image to string converted function
  const onLoad = (fileString) => {
    setImage(fileString);
    setbase64code(fileString);
  };

  // Image file reader function
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  // form initialValues
  const [food, setFood] = useReducer(formReducer, {
    name: "",
    desc: "",
    img: image,
    price: "",
    rating: "",
    offer: "",
  });

  // form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // api call
      await axios.post(`${ProductAPI}/products`, food);
      navigate("/foodList");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <AdminNavbar />
      <div className="row justify-content-center m-2 mt-5">
        <div className="col-sm-4 col-md-6 col-lg-4 p-3 mx-auto gap-3 rounded-5 shadow-lg p-4">
          <form
            className="d-flex flex-column gap-3 text-center"
            onSubmit={handleSubmit}
          >
            <h4 className="MainContent_Text">Add Food</h4>
            {/* Food name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Food Name"
                id="name"
                required
                className="form-control"
                onChange={setFood}
              />
            </div>
            {/*  description */}
            <div>
              <input
                type="text"
                name="desc"
                className="form-control"
                placeholder="Description"
                id="desc"
                required
                onChange={setFood}
              />
            </div>
            {/* Base64 */}
            <div>
              <input
                type="file"
                className="form-control"
                required
                onChange={imghandleSubmit}
              />
            </div>
            {/* Image */}
            <div>
              <input
                type="text"
                name="img"
                placeholder=""
                className="form-control"
                id="img"
                value={image}
                onChange={setFood}
                required
              />
            </div>
            {/* Price */}
            <div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="form-control"
                id="price"
                required
                onChange={setFood}
              />
            </div>
            {/*  Rating */}
            <div>
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                className="form-control"
                id="rating"
                required
                onChange={setFood}
              />
            </div>
            {/*  offer */}
            <div>
              <input
                type="number"
                name="offer"
                placeholder="offer"
                className="form-control"
                id="offer"
                required
                onChange={setFood}
              />
            </div>
            {/* submit Button */}
            <button
              type="submit"
              className="btn btn-outline-dark warning fw-bold"
            >
              Add Food
            </button>
          </form>
        </div>
        <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
          <img
            src="https://pirscapital.com/wp-content/themes/pirscapital-v1/assets/images/gif-1-Revised.gif"
            className="w-100"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

// Edit FoodList function
export function EditFoodList() {
  // state management
  const { id } = useParams();
  const [food, setFood] = useState(null);

  // edit food api call
  const editFood = async () => {
    try {
      const { data } = await axios.get(`${ProductAPI}/products/${id}`);
      setFood(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect use refresh data
  useEffect(() => {
    editFood();
  });

  return (
    <div className="container">
      {food ? (
        <EditFoodForm food={food} />
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

// Edit Food list form function
export function EditFoodForm({ food }) {
  // navigate to page
  const navigate = useNavigate();
  // state management
  const [base64code, setbase64code] = useState("");
  const [image, setImage] = useState("");

  // image handle function
  const imghandleSubmit = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };

  // image file converted to string
  const onLoad = (fileString) => {
    setImage(fileString);
    setbase64code(fileString);
  };

  // image file reader
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  // state management
  const [name, setName] = useState(food.name);
  const [img, setImg] = useState(food.img);
  const [desc, setDesc] = useState(food.desc);
  const [price, setPrice] = useState(food.price);
  const [rating, setRating] = useState(food.rating);
  const [offer, setOffer] = useState(food.offer);

  // edit food update form and api call
  const editfood = () => {
    const updateFood = {
      name: name,
      img: img,
      desc: desc,
      price: price,
      rating: rating,
      offer: offer,
    };
    fetch(`${ProductAPI}/products/${food._id}`, {
      method: "PUT",
      body: JSON.stringify(updateFood),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => navigate("/foodList"));
  };

  return (
    <div className="container">
      <AdminNavbar />
      <div className="row justify-content-center m-2 mt-5 mx-auto gap-3">
        <div className="col-sm-4 col-md-6 col-lg-4 p-3 rounded-5 shadow-lg p-4 mx-auto">
          <h5 className="text-center MainContent_Text">Edit Food List</h5>
          {/* name */}
          <input
            className="mt-2 form-control"
            value={name}
            type="text"
            placeholder="name"
            onChange={(event) => setName(event.target.value)}
          />
          {/* image file */}
          <input
            className="mt-2 form-control"
            type="file"
            onChange={imghandleSubmit}
          />
          {/* iamge link */}
          <input
            className="mt-2 form-control"
            value={image}
            type="text"
            placeholder="Image"
            onChange={(event) => setImg(event.target.value)}
          />
          {/* description */}
          <input
            className="mt-2 form-control"
            value={desc}
            type="text"
            placeholder="Description"
            onChange={(event) => setDesc(event.target.value)}
          />
          {/* price */}
          <input
            className="mt-2 form-control"
            value={price}
            type="number"
            placeholder="Price"
            onChange={(event) => setPrice(event.target.value)}
          />
          {/* rating */}
          <input
            className="mt-2 form-control"
            value={rating}
            type="number"
            placeholder="Rating"
            onChange={(event) => setRating(event.target.value)}
          />
          {/* offer */}
          <input
            className="mt-2 form-control"
            value={offer}
            type="number"
            placeholder="offer"
            onChange={(event) => setOffer(event.target.value)}
          />
          {/* submit button */}
          <button
            className="btn btn-outline-success fw-bold mt-2 form-control"
            onClick={editfood}
          >
            UPDATE
          </button>
        </div>
        <div className="col-sm-4 col-md-6 col-lg-6 mx-auto">
          <img
            src="https://www.excelsisdeo.com/images/AlphaTestersAnimation_60.gif"
            className="w-100"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
