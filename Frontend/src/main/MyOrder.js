import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";

import Footer from "../components/Footer";
import "./MyOrder.scss";

function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("https://resturant-website-2036.onrender.com/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });
      const data = await response.json();
      //console.log("Fetched data:", data);

      if (data && data.orderData) {
        setOrderData(data.orderData);
      } else {
        setOrderData({});
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Nav />
      <div className="container-history ">
        {orderData.order_data &&
        Array.isArray(orderData.order_data) &&
        orderData.order_data.length > 0 ? (
          orderData.order_data.map((data, index) => (
            <div key={index}>
              <div className="order-item">
                <h5 className="card-title">{data.name}</h5>
                <section className="item-details">
                  <p> Date: {data.Order_date}</p>
                  <p>Quantity: {data.quantity}</p>
                  <p> Size: {data.size}</p>
                  <p>Price: ${data.price}</p>
                </section>
              </div>
            </div>
          ))
        ) : (
          <p>No order data available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default MyOrder;
