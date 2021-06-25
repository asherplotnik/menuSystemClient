import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import MenuOrderModel from "../../../Models/MenuOrderModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import SingleOrder from "../SingleOrder/SingleOrder";
import "./OrderDisplay.css";

function OrderDisplay(): JSX.Element {
  let [token, setToken] = useState(store.getState().AuthState.auth.token);
  let [orders, setOrders] = useState<MenuOrderModel[]>([]);
  const history = useHistory();
  const getOrders = useCallback(
    () =>
      axios
        .get<MenuOrderModel[]>(
          globals.urls.localUrl + "display/getOrdersByStatus/ORDERED",
          {
            headers: { token: token },
          }
        )
        .then(function (response) {
          setOrders(response.data);
        })
        .catch(function (error) {}),
    [token]
  );
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
  }, [history, getOrders]);
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
