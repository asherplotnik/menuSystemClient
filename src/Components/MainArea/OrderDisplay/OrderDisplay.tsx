import axios from "axios";
import React, { useEffect, useState } from "react";
import MenuOrderModel from "../../../Models/MenuOrderModel";
import globals from "../../../Services/Globals";
import SingleOrder from "../SingleOrder/SingleOrder";
import "./OrderDisplay.css";

function OrderDisplay(): JSX.Element {
  let [orders, setOrders] = useState<MenuOrderModel[]>([]);
  let [token, setToken] = useState("");
  const getOrders = () => {
    axios
      .get<MenuOrderModel[]>(globals.urls.localUrl + "display/getOpenOrders", {
        headers: { token: token },
      })
      .then(function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {});
  };
  useEffect(() => {
    axios
      .post(globals.urls.localUrl + "auth/signIn/", {
        password: "111111",
        email: "11@11",
      })
      .then((response) => {
        setToken(response.data);
        axios
          .get<MenuOrderModel[]>(
            globals.urls.localUrl + "display/getOpenOrders",
            { headers: { token: response.data } }
          )
          .then(function (res) {
            setOrders(res.data);
          })
          .catch(function (error) {});
      })
      .catch(() => {});
  }, []);
  return (
    <div className="OrderDisplay">
      {orders &&
        orders.map((order, index) => (
          <SingleOrder
            key={index}
            order={order}
            getOrders={getOrders}
            token={token}
          />
        ))}
    </div>
  );
}

export default OrderDisplay;
