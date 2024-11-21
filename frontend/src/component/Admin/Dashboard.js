import React, {useEffect} from 'react';
import SideBar from './Sidebar.js';
import "./Dashboard.css";
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { getProductsAdmin} from "../../actions/productAction";
import { useDispatch, useSelector } from 'react-redux';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products && products.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock += 1;
    }
  });
  useEffect(() => {
    dispatch(getAllOrders())
    dispatch(getProductsAdmin());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalNumber = 0;
  orders && orders.forEach(item => {
    totalNumber += item.totalPrice
  })
  const totalAmount = parseFloat(totalNumber.toFixed(2));

const lineState = {
  labels: ["Initial amount", "Amount Earned"],
  datasets: [
    {
      label: "TOTAL AMOUNT",
      backgroundColor: "tomato",
      hoverBackgroundColor: "rgb(197, 72, 49)",
      data: [0, totalNumber],
    },
  ],
  };
const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return <div className='dashboard'>
    <SideBar />
    <div className='dashboardContainer'>
      <Typography component="h1">Dashboard</Typography>
      <div className='dashboardSummary'>
        <div>
          <p>
            Total amount <br /> $ {totalAmount}
          </p>
        </div>
        <div className='dashboardSummaryBox2'>
          <Link to='/admin/products'>
            <p>Product</p>
            <p>{products && products.length}</p>
          </Link>
          <Link to='/admin/users'>
            <p>Users</p>
            <p>{users && users.length}</p>
          </Link>
          <Link to='/admin/orders'>
            <p>Orders</p>
            <p>{orders && orders.length}</p>
          </Link>
        </div>

      </div>
      <div className='lineChart'>
        <Line
          data={lineState}
        />
      </div><div className='doughnutChart'>
        <Doughnut
          data={doughnutState}
        />
      </div>
    </div>
  </div>
}

export default Dashboard
