import "./App.css";
import ContentPage from "./containers/ContentPage/ContentPage";
import { Routes as Routes, Route } from "react-router-dom";
import About from "./containers/AboutPage/About";
import Products from "./containers/Products/Products";
import LoginPage from "./containers/LoginPage/LoginPage";
import SignUpPage from "./containers/SignUpPage/SignUpPage";
import ContactPage from "./containers/ContactPage/ContactPage";
import ProductInfo from "./containers/ProductInfo/ProductInfo";
import Admin from "./containers/Admin/AdminLogin";
import Cart from "./containers/CartPage.js/Cart";
import UserNavbar from "./containers/userNavbar/userNavbar";
import MyOrders, { UserOrdersInfo } from "./containers/MyOrders/MyOrders";
import Success from "./containers/PaymentSuccess/Success";
import AdminHome from "./containers/Admin/AdminHome";
import UserList, { UserInfo } from "./containers/Admin/UserList";
import FoodList, {
  AddFoodList,
  EditFoodList,
} from "./containers/Admin/FoodList";
import OrderList, {
  EditOrderList,
  OrdersInfo,
} from "./containers/Admin/OrderList";
import AdminNavbar from "./containers/Admin/AdminNavbar";
import ForgetPassword from "./containers/ForgetPassword/ForgetPassword";
import ResetPassword from "./containers/ForgetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Email from "./containers/Email/Email";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ContentPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/userNavbar" element={<UserNavbar />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/userOrdersInfo/:id" element={<UserOrdersInfo />} />
        <Route path="/success" element={<Success />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/adminNavbar" element={<AdminNavbar />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/orderList" element={<OrderList />} />
        <Route path="/orders/:id" element={<OrdersInfo />} />
        <Route path="/editOrderList/edit/:id" element={<EditOrderList />} />
        <Route path="/foodList" element={<FoodList />} />
        <Route path="/addFoodList" element={<AddFoodList />} />
        <Route path="/editFoodList/edit/:id" element={<EditFoodList />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/email" element={<Email/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
