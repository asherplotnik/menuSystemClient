import "./MakeOrder.css";
import { useForm } from "react-hook-form";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import globals from "../../../Services/Globals";
import DishModel from "../../../Models/DishModel";
import DishCard from "../DishCard/DishCard";

function MakeOrder(): JSX.Element {
  let [dishes, setDishes] = useState<DishModel[]>([]);
  let [selectedDishes, setSelectedDishes] = useState<DishModel[]>([]);
  const handleSelectedDish = (dish: DishModel) => {
    let temp = selectedDishes;
    temp.push(dish);
    setSelectedDishes(temp);
    console.log(selectedDishes);
  };
  useEffect(() => {
    axios
      .get(globals.urls.localUrl + "order/getMenu")
      .then((response) => {
        setDishes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  interface IFormInput {
    firstName: String;
  }
  const { register, handleSubmit } = useForm();

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

  const onSubmit = (data: IFormInput) => console.log(data);
  return (
    <div className="MakeOrder">
      <Tabs
        id="controlled-tab-example"
        // activeKey={key}
        // onSelect={(k) => setKey(k)}
      >
        {menuTab("DRINK", "Drink")}
        {menuTab("MAIN_COURSE", "Main course")}
        {menuTab("STARTER", "Starters")}
        {menuTab("DESSERT", "Dessert")}
        {menuTab("SOUP", "Soup")}
        {menuTab("SIDE_DISH", "Side dish")}
      </Tabs>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Note: </Form.Label>
          <Form.Control name="note" {...register("note")} />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default MakeOrder;
