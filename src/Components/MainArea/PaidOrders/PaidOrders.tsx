import "./PaidOrders.css";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import MenuOrderModel from "../../../Models/MenuOrderModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import { ListGroup } from "react-bootstrap";
import { StatusEnum } from "../../../Models/Enums";
import OrdersByDates from "../../../Models/OrdersByDates";
import jwtAxios from "../../../Services/jwtAxios";
function PaidOrders(): JSX.Element {
  let [orders, setOrders] = useState<MenuOrderModel[]>([]);
  let [showDates, setShowDates] = useState([]);
  let [showOrders, setShowOrders] = useState([]);
  const history = useHistory();

  const handleClickDates = (e: SyntheticEvent, indexDate: number) => {
    if (showDates.indexOf(indexDate) > -1) {
      let temp = [...showDates];
      temp.splice(showDates.indexOf(indexDate), 1);
      setShowDates(temp);
    } else {
      let temp = [...showDates];
      temp.push(indexDate);
      setShowDates(temp);
    }
  };

  const handleClickOrders = (e: SyntheticEvent, orderId: number) => {
    if (showOrders.indexOf(orderId) === -1) {
      let temp = [...showOrders];
      temp.push(orderId);
      setShowOrders(temp);
    } else {
      let temp = [...showOrders];
      temp.splice(showOrders.indexOf(orderId), 1);
      setShowOrders(temp);
    }
  };

  const getOrders = () =>
    jwtAxios
        .get<MenuOrderModel[]>(
          globals.urls.localUrl + "display/getOrdersByStatus/PAID")
        .then((response) => {
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

  const arrangeOrdersByDate = (): JSX.Element => {
    let orderList: OrdersByDates[] = [];
    for (let i = 0; i < orders.length; i++) {
      const orderTime = new Date(orders[i].time);
      if (orders[i].status === StatusEnum.PAID) {
        let orderDate = new Date(
          orderTime.getFullYear(),
          orderTime.getMonth(),
          orderTime.getDate()
        );
        if (
          orderList.length > 0 &&
          orderList[orderList.length - 1].date.getTime() === orderDate.getTime()
        ) {
          orderList[orderList.length - 1].orders.push(orders[i]);
        } else {
          let curr = new OrdersByDates();
          curr.date = orderDate;
          curr.orders.push(orders[i]);
          orderList.push(curr);
        }
      }
    }
    return (
      <ListGroup>
        {orderList.map((dateDiv, indexDate) => {
          let dateGroup = <></>;
          if (showDates.indexOf(indexDate) > -1) {
            dateGroup = (
              <div className="MarginTop">
                <ListGroup>
                  {dateDiv.orders.map((order, indexOrder) => {
                    let orderGroup = <div></div>;
                    if (showOrders.indexOf(order.id) > -1) {
                      orderGroup = (
                        <div className="MarginTop">
                          <ListGroup>
                            {order.entries.map((entry, indexEntry) => {
                              return (
                                <ListGroup.Item key={indexEntry}>
                                  {entry.dish.name} | {entry.quantity}
                                </ListGroup.Item>
                              );
                            })}
                          </ListGroup>
                        </div>
                      );
                    }
                    const currDate = new Date(order.time);
                    return (
                      <ListGroup.Item key={indexOrder}>
                        <div
                          onClick={(event) =>
                            handleClickOrders(event, order.id)
                          }
                        >
                          ID: {order.id} | Customer: {order.user.name} | Date:{" "}
                          {currDate.getDate()}/{currDate.getMonth()}/
                          {currDate.getFullYear()} | Type: {order.orderType} |{" "}
                          Note: {order.note} | Total: {calculateTotal(order)}
                        </div>
                        {orderGroup}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </div>
            );
          }
          return (
            <ListGroup.Item key={indexDate}>
              <div onClick={(event) => handleClickDates(event, indexDate)}>
                {dateDiv.date.getDate()}/{dateDiv.date.getMonth()}/
                {dateDiv.date.getFullYear()}
              </div>
              {dateGroup}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  };
  return <div className="PaidOrders">{orders && arrangeOrdersByDate()}</div>;
}

export default PaidOrders;
