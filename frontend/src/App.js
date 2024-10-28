import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import { getUser } from './actions/userAction';
import './App.css';
import CreateProduct from './component/Admin/CreateProduct.js';
import Dashboard from "./component/Admin/Dashboard.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import ProductList from "./component/Admin/ProductList.js";
import Reviews from "./component/Admin/Reviews.js";
import UpdateProduct from './component/Admin/UpdateProduct.js';
import UpdateUser from "./component/Admin/UpdateUser.js";
import UsersList from "./component/Admin/UsersList.js";
import Cart from "./component/Cart/Cart.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import Payment from "./component/Cart/Payment.js";
import Shipping from "./component/Cart/Shipping.js";
import Home from "./component/Home/Home.js";
import Footer from './component/layout/Footer/Footer.js';
import Header from './component/layout/Header/Header.js';
import UserOptions from "./component/layout/Header/UserOptions.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import ForgotPassword from "./component/User/ForgotPassword.js";
import LoginRegister from './component/User/LoginRegister';
import Profile from "./component/User/Profile.js";
import ResetPassword from "./component/User/ResetPassword.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import store from "./store";



function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      },
    });
    store.dispatch(getUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/account" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/me/update" element={<ProtectedRoute element={<UpdateProfile />} />} />
        <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />




        <Route path="/cart"  element={<Cart />}  />
        <Route path="/shipping" element={<ProtectedRoute element={<Shipping />} />} />
        <Route path="/order/confirm" element={<ProtectedRoute element={<ConfirmOrder />} />} />
        {stripeApiKey &&  <Route
          path="/process/payment"
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute element={<Payment />} />
            </Elements>
          }
        />
        }
        <Route path="/success" element={<ProtectedRoute element={<OrderSuccess />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<MyOrders />} />} />
        <Route path="/order/:id" element={<ProtectedRoute element={<OrderDetails />} />} />





        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} element={<Dashboard />} />} />
        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true} element={<ProductList />} />} />
        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true} element={<CreateProduct />} />} />
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} element={<UpdateProduct />} />} />
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} element={<OrderList />} />} />
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true} element={<ProcessOrder />} />} />
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true} element={<UsersList />} />} />
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true} element={<UpdateUser />} />} />
        <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true} element={<Reviews />} />} />


















        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
