import React from "react";
import { Link } from "react-router-dom";

export default function ManagerDashboard() {
  return (
    <div>
      <h1>Manager's Area</h1>
      <div>Total revenue</div>
      <div>Total orders</div>
      <div>Total clients</div>
      <div>Total restaurants</div>
      <div>Most Popular Days</div>
      <div>Most Popular Time</div>
      <div>Most Popular Products</div>
      <div>
        <Link to="/">View my Restaurants</Link>
      </div>
      <div>
        <Link to="/managers/restaurants/create">Add a Restaurant</Link>
      </div>
      <div>
        <Link to="/">View my Categories</Link>
      </div>
      <div>
        <Link to="/managers/categories/create">Add a Category</Link>
      </div>
      <div>
        <Link to="/">View my Products</Link>
      </div>
      <div>
        <Link to="/managers/products/create">Add a Product</Link>
      </div>
      <div>
        <Link to="/managers/orders">Order History</Link>
      </div>
    </div>
  );
}
