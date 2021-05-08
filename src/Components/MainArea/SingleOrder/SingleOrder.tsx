import axios from "axios";
import { useState } from "react";
import { Alert, Card, ListGroup } from "react-bootstrap";
import MenuEntryModel from "../../../Models/MenuEntryModel";
import MenuOrderModel from "../../../Models/MenuOrderModel";
import globals from "../../../Services/Globals";
import "./SingleOrder.css";

interface MoProps {
  order: MenuOrderModel;
  getOrders: Function;
  token: string;
}
function SingleOrder(props: MoProps): JSX.Element {
  let myDate = new Date(props.order.time);
  const [updatePage, setUpdatePage] = useState(0);

  const handleOrderReady = () => {
    if (props.order.entries.length === updatePage) {
      axios
        .post(
          globals.urls.localUrl +
            "display/updateOrderStatus/" +
            props.order.id +
            "/READY",
          {},
          { headers: { token: props.token } }
        )
        .then(() => {
          props.getOrders();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUpdateEntry = (entry: MenuEntryModel) => {
    if (entry.ready) {
      entry.ready = null;
      axios
        .post(
          globals.urls.localUrl + "display/updateEntryStatus/" + entry.id,
          {},
          { headers: { token: props.token } }
        )
        .then(() => {
          setUpdatePage(updatePage - 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      entry.ready = new Date();
      axios
        .post(
          globals.urls.localUrl + "display/updateEntryStatus/" + entry.id,
          {},
          { headers: { token: props.token } }
        )
        .then(() => {
          setUpdatePage(updatePage + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="MenuOrder">
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item key={1}>
            <Alert
              onClick={handleOrderReady}
              variant={
                props.order.entries.length === updatePage ? "success" : "light"
              }
            >
              ID: {props.order.id} Time: {myDate.getHours()} :{" "}
              {myDate.getMinutes()}
            </Alert>
          </ListGroup.Item>
          <ListGroup.Item key={2}>
            <div
              style={
                props.order.orderType === "TABLE"
                  ? { backgroundColor: "cadetblue" }
                  : { backgroundColor: "greenyellow" }
              }
            >
              {props.order.orderType}
            </div>
            <span>Name: {props.order.customer.name}</span> <br />
            Note: {props.order.note}
          </ListGroup.Item>
          <ListGroup.Item key={3}>
            {props.order.entries.map((entry, index) => {
              return (
                <div key={index} className="EntryDiv">
                  <Alert
                    onClick={() => handleUpdateEntry(entry)}
                    variant={entry.ready !== null ? "primary" : "light"}
                  >
                    {index + 1}) {entry.dish.name} Qty: {entry.quantity}
                  </Alert>
                </div>
              );
            })}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default SingleOrder;
