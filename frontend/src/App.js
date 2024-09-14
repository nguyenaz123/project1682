import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from "webfontloader";
import './App.css';
import Home from "./component/Home/Home.js";
import Footer from './component/layout/Footer/Footer.js';
import Header from './component/layout/Header/Header.js';
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginRegister from './component/User/LoginRegister';
import store from "./store";
import { getUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";



function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      },
    });
    store.dispatch(getUser());
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




        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
