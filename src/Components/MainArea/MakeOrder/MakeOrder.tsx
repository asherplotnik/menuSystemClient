import "./MakeOrder.css";
import { useForm } from "react-hook-form";
import { Button, Form, Tab, Table, Tabs } from "react-bootstrap";
import { useEffect, useState } from "react";
import globals from "../../../Services/Globals";
import DishModel from "../../../Models/DishModel";
import DishCard from "../DishCard/DishCard";
import EntryPayload from "../../../Models/EntryPayload";
import OrderPayload from "../../../Models/OrderPayload";
import { OrderType } from "../../../Models/Enums";
import store from "../../../Redux/Store";
import { useHistory } from "react-router";
import { errorAlert } from "../../../Services/errorService";
import jwtAxios from "../../../Services/jwtAxios";

function MakeOrder(): JSX.Element {
  let [dishes, setDishes] = useState<DishModel[]>([]);
  let [selectedDishes, setSelectedDishes] = useState<EntryPayload[]>([]);
  let [key, setKey] = useState("DRINK");
  let [up, setUp] = useState(0);
  const history = useHistory();
  const handleSelectedDish = (dish: DishModel) => {
    let temp = [...selectedDishes];
    let currEntry = new EntryPayload();
    currEntry.dishId = dish.id;
    let i = 0;
    for (; i < temp.length; i++) {
      if (temp[i].dishId === dish.id) {
        temp[i].quantity++;
        break;
      }
    }
    if (i === temp.length) {
      currEntry.quantity = 1;
      temp.push(currEntry);
    }
    setSelectedDishes(temp);
    console.log(selectedDishes);
    setUp(up + 1);
  };
  const handleCheckout = () => {
    setKey("yourOrder");
  };
  const handleCancel = (dish: EntryPayload) => {
    let temp = [...selectedDishes];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].dishId === dish.dishId && temp[i].quantity > 0) {
        temp[i].quantity--;
        if (temp[i].quantity === 0) {
          temp.splice(i, 1);
        }
        break;
      }
    }
    setSelectedDishes(temp);
    setUp(up + 1);
  };

  useEffect(() => {
    if (!store.getState().AuthState.auth.token) {
      history.push("/login");
    }
    jwtAxios
      .get(globals.urls.localUrl + "order/getMenu")
      .then((response) => {
        setDishes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history]);

  const { register, handleSubmit } = useForm();
  interface IFormInput {
    note: string;
    orderType: string;
  }

  const confirmOrder = (data: IFormInput) => {
    const order: OrderPayload = new OrderPayload();
    if (data.orderType) {
      order.orderType = OrderType.PICKUP;
    } else {
      order.orderType = OrderType.TABLE;
    }
    order.note = data.note;
    order.entries = selectedDishes;
    jwtAxios
      .post<OrderPayload>(globals.urls.localUrl + "order/makeOrder", order)
      .then(() => {
        setSelectedDishes([]);
        alert("Order Sent.");
      })
      .catch((err) => {
        setSelectedDishes([]);
        errorAlert(err);
      });
  };

  const menuTab = (cat: string, title: string): JSX.Element => {
    return (
      <Tab eventKey={cat} title={title}>
        <div className="CardsWrapper">
          {dishes
            .filter((dish) => dish.category === cat)
            .map((dish, index) => (
              <DishCard key={index} dish={dish} selected={handleSelectedDish} />
            ))}
        </div>
      </Tab>
    );
  };

  return (
    <div className="MakeOrder">
      <img alt="salad" className="BackImg" src = "https://i.ibb.co/0BRfdw5/salad2.jpg"/>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        {menuTab("DRINK", "Drink")}
        {menuTab("MAIN_COURSE", "Main course")}
        {menuTab("STARTER", "Starters")}
        {menuTab("DESSERT", "Dessert")}
        {menuTab("SOUP", "Soup")}
        {menuTab("SIDE_DISH", "Side dish")}
        {selectedDishes.length !== 0 && (
          <Tab eventKey="yourOrder" title="Your Order">
            <div className="TabWrapper">
              <div className="OrderBox Box">
                <Table>
                  <tr key={-1}>
                    <th>Course</th>
                    <th style={{ textAlign: "center" }}>Quantity</th>
                    <th style={{ textAlign: "center" }}>Cancel</th>
                  </tr>
                  {selectedDishes.map((dish, index) => {
                    const currDish = dishes.find(
                      (menuDish) => menuDish.id === dish.dishId
                    );
                    return (
                      <tr key={index}>
                        <td>
                          #{dish.dishId} {currDish.name}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {" "}
                          {dish.quantity}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Button
                            onClick={() => handleCancel(dish)}
                            variant="danger"
                          >
                            X
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </Table>
                <Form
                  className="FormWrapper"
                  onSubmit={handleSubmit(confirmOrder)}
                >
                  <Form.Group controlId="formBasicNote">
                    <Form.Label>Note: </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="note"
                      {...register("note")}
                    />
                  </Form.Group>
                  <Form.Group
                    style={{ padding: "5px" }}
                    controlId="formBasicCheckbox"
                  >
                    <Form.Check
                      name="orderType"
                      type="checkbox"
                      label="Take away"
                      {...register("orderType")}
                    />
                  </Form.Group>
                  <Button style={{ margin: "5px" }} type="submit">
                    Confirm order
                  </Button>
                </Form>
              </div>
            </div>
          </Tab>
        )}
      </Tabs>
      <div className="ButtonWrapper">
        <Button
          onClick={handleCheckout}
          className={
            key === "yourOrder" || selectedDishes.length === 0 ? "Hidden" : ""
          }
        >
          CHECKOUT
        </Button>
      </div>
    </div>
  );
}

export default MakeOrder;
