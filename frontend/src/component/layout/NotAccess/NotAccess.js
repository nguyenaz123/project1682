import React from 'react';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./NotAccess.css"

const NotAccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>You are not access to this route</Typography>
      <Link to="/">Back to shop</Link>
    </div>
  )
}

export default NotAccess
