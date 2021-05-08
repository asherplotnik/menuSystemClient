import "./ReadyOrders.css";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import MenuOrderModel from "../../../Models/MenuOrderModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import { Alert, Card, ListGroup } from "react-bootstrap";

function ReadyOrders(): JSX.Element {
  let [token, setToken] = useState(store.getState().AuthState.auth.token);
  let [orders, setOrders] = useState<MenuOrderModel[]>([]);
  const history = useHistory();

  const handleOrderServed = (id: number) => {
    axios
      .post(
        globals.urls.localUrl + "display/updateOrderStatus/" + id + "/SERVED",
        {},
        { headers: { token: token } }
      )
      .then(() => {
        getOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOrders = useCallback(
    () =>
      axios
        .get<MenuOrderModel[]>(
          globals.urls.localUrl + "display/getOrdersByStatus/READY",
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
    getOrders();
  }, [history, getOrders]);
  return (
    <div className="ReadyOrders">
      {orders &&
        orders.map((order, index) => {
          let myDate = new Date(order.time);
          return (
            <div key={index} className="ReadyOrderDiv">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item key={1}>
                    <Alert
                      onClick={() => handleOrderServed(order.id)}
                      variant="success"
                    >
                      ID: {order.id} Time: {myDate.getHours()} :{" "}
                      {myDate.getMinutes() < 10
                        ? "0" + myDate.getMinutes()
                        : myDate.getMinutes()}
                    </Alert>
                  </ListGroup.Item>
                  <ListGroup.Item key={2}>
                    <div
                      style={
                        order.orderType === "TABLE"
                          ? { backgroundColor: "cadetblue" }
                          : { backgroundColor: "greenyellow" }
                      }
                    >
                      {order.orderType}
                    </div>
                    <span>Name: {order.customer.name}</span> <br />
                    Note: {order.note}
                  </ListGroup.Item>
                  <ListGroup.Item key={3}>
                    {order.entries.map((entry, ind) => {
                      return (
                        <div key={ind}>
                          <Alert
                            variant={entry.ready !== null ? "primary" : "light"}
                          >
                            {ind + 1}) {entry.dish.name} Qty: {entry.quantity}
                          </Alert>
                        </div>
                      );
                    })}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
          );
        })}
    </div>
  );
}

export default ReadyOrders;
