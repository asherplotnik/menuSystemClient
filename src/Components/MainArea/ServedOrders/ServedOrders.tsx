import "./ServedOrders.css";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import MenuOrderModel from "../../../Models/MenuOrderModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import { Alert, Card, ListGroup } from "react-bootstrap";
import jwtAxios from "../../../Services/jwtAxios";

function ServedOrders(): JSX.Element {
  let [orders, setOrders] = useState<MenuOrderModel[]>([]);
  const history = useHistory();

  const handleOrderServed = (id: number) => {
    jwtAxios
      .post(
        globals.urls.localUrl + "display/updateOrderStatus/" + id + "/PAID",{})
      .then(() => {
        getOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOrders =  () =>
    jwtAxios
        .get<MenuOrderModel[]>(
          globals.urls.localUrl + "display/getOrdersByStatus/SERVED")
        .then(function (response) {
          setOrders(response.data);
        })
        .catch(function (error) {});

  const calculateTotal = (order: MenuOrderModel): number => {
    let total = 0;
    order.entries.map((entry) => {
      total += entry.dish.price * entry.quantity;
      return null;
    });
    return total;
  };

  useEffect(() => {
    if (!store.getState().AuthState.auth.token) {
      history.push("/login");
    }
    getOrders();
  }, [history]);
  return (
    <div className="ServedOrders">
      {orders &&
        orders.map((order, index) => {
          let myDate = new Date(order.time);
          let total = calculateTotal(order);
          return (
            <div key={index} className="ServedOrderDiv">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item key={1}>
                    <Alert variant="success">
                      ID: {order.id} Time: {myDate.getHours()} :{" "}
                      {myDate.getMinutes() < 10
                        ? "0" + myDate.getMinutes()
                        : myDate.getMinutes()}
                    </Alert>
                    <Alert
                      onClick={() => handleOrderServed(order.id)}
                      variant="danger"
                    >
                      TOTAL: {total}
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
                    <span>Name: {order.user.name}</span> <br />
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

export default ServedOrders;
