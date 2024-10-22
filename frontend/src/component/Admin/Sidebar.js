import React, { useState } from 'react';
import "./Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Sidebar = () => {
  const [isProductsOpen, setProductsOpen] = useState(false);

  const toggleProducts = () => {
    setProductsOpen(!isProductsOpen);
  };

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <div className="sidebar__products">
        <p onClick={toggleProducts}>
          <ImportExportIcon /> Products {isProductsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </p>
        {isProductsOpen && (
          <div className="sidebar__submenu">
            <Link to="/admin/products">
              <p><PostAddIcon /> All Products</p>
            </Link>
            <Link to="/admin/product">
              <p><AddIcon /> Create Product</p>
            </Link>
          </div>
        )}
      </div>

      <Link to="/admin/orders">
        <p>
          <ListAltIcon /> Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
