import "./PaidOrders.css";
import axios from "axios";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import MenuOrderModel from "../../../Models/MenuOrderModel";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import { ListGroup } from "react-bootstrap";
import { StatusEnum } from "../../../Models/Enums";
import OrdersByDates from "../../../Models/OrdersByDates";
function PaidOrders(): JSX.Element {
  let [token, setToken] = useState(store.getState().AuthState.auth.token);
  let [orders, setOrders] = useState<MenuOrderModel[]>([]);
  let [showDates, setShowDates] = useState([]);
  let [showOrders, setShowOrders] = useState([]);
  const history = useHistory();

  const handleClickDates = (e: SyntheticEvent, indexDate: number) => {
    if ((e.target as HTMLElement).className.includes("ShowDate")) {
      (e.target as HTMLElement).className = (e.target as HTMLElement).className.slice(
        0,
        (e.target as HTMLElement).className.length - 9
      );
      if (showDates.indexOf(indexDate) > -1) {
        let temp = [...showDates];
        temp.splice(showDates.indexOf(indexDate), 1);
        setShowDates(temp);
      }
    } else {
      (e.target as HTMLElement).className =
        (e.target as HTMLElement).className + " ShowDate";
      let temp = [...showDates];
      temp.push(indexDate);
      setShowDates(temp);
    }
  };
  const handleClickOrders = (e: SyntheticEvent, indexOrder: number) => {
    if ((e.target as HTMLElement).className.includes("ShowDate")) {
      (e.target as HTMLElement).className = (e.target as HTMLElement).className.slice(
        0,
        (e.target as HTMLElement).className.length - 9
      );
      if (showOrders.indexOf(indexOrder) > -1) {
        let temp = [...showOrders];
        temp.splice(showOrders.indexOf(indexOrder), 1);
        setShowOrders(temp);
      }
    } else {
      (e.target as HTMLElement).className =
        (e.target as HTMLElement).className + " ShowDate";
      let temp = [...showOrders];
      temp.push(indexOrder);
      setShowOrders(temp);
    }
  };

  const getOrders = useCallback(
    () =>
      axios
        .get<MenuOrderModel[]>(
          globals.urls.localUrl + "display/getOrdersByStatus/PAID",
          {
            headers: { token: token },
          }
        )
        .then((response) => {
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
                    let orderGroup = <></>;
                    if (showOrders.indexOf(indexOrder) > -1) {
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
                    return (
                      <ListGroup.Item key={indexOrder}>
                        <div
                          onClick={(event) =>
                            handleClickOrders(event, indexOrder)
                          }
                        >
                          {order.id} | {order.customer.name} | {order.time} |
                          {order.orderType} | {order.note}
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
