import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import MenuOrderModel from "../../../Models/MenuOrderModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import SingleOrder from "../SingleOrder/SingleOrder";
import "./OrderDisplay.css";

function OrderDisplay(): JSX.Element {
  let [token, setToken] = useState(store.getState().AuthState.auth.token);
  let [orders, setOrders] = useState<MenuOrderModel[]>([]);
  const history = useHistory();
  const getOrders = () =>
    jwtAxios
        .get<MenuOrderModel[]>(
          globals.urls.localUrl + "display/getOrdersByStatus/ORDERED")
        .then(function (response) {
          setOrders(response.data);
        })
        .catch(function (error) {});
  useEffect(() => {
    setToken(store.getState().AuthState.auth.token);
    if (!store.getState().AuthState.auth.token) {
      history.push("/login");
    }
    let refreshOrders = setInterval(() => {
      getOrders();
    }, 5000);
    return () => {
      clearInterval(refreshOrders);
    };
  }, [history]);
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
