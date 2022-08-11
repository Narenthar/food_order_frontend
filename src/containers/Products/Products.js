// import files
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { ProductAPI } from "../../Global files/ProductsAPI";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../userNavbar/userNavbar";

// products page
export default function Products() {
  // navigate to page
  const navigate = useNavigate();
  // state management
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // get product function & api call
  const getProducts = async () => {
    try {
      const authToken = window.localStorage.getItem("authToken");
      const { data } = await axios.get(`${ProductAPI}/products`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  // useEffect use refresh data
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">
      <UserNavbar />
      <div className="d-flex justify-content-between">
        <input
          type="text"
          className="mx-auto rounded-2 w-25 px-4"
          placeholder="Search food"
          onChange={(event) => setQuery(event.target.value)}
        />
        <p className="text-center dark fw-bold mx-auto">-Most Popular Items</p>
      </div>
      <div className="row ms-auto">
        <div className="text-center">
          {isLoading && (
            <div className="">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                alt=""
              />
            </div>
          )}
        </div>
        {products
          .filter((g) => g.name.toLowerCase().includes(query))
          .map((element) => (
            <ProductTemplate
              _id={element._id}
              key={element.id}
              img={element.img}
              name={element.name}
              price={element.price}
            />
          ))}
      </div>
    </div>
  );
}

// products template
function ProductTemplate({ name, img, _id }) {
  const navigate = useNavigate();
  return (
    <div className="col-lg-4 col-md-6">
      <div class="mt-5 product_temp_card border-0 shadow-lg rounded-5 mx-auto gap-1 text-center p-2">
        <img
          src={img}
          class="card-img-top rounded-3"
          height={"170px"}
          alt="..."
          onClick={() => navigate("/product/" + _id)}
        />
        <h6 className="fw-bold">{name}</h6>
      </div>
    </div>
  );
}
