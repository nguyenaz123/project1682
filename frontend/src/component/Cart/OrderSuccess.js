import React from 'react';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./OrderSuccess.css"

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order has been successfully created</Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess
