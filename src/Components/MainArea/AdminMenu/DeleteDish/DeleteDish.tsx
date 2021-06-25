import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DishModel from "../../../../Models/DishModel";
import store from "../../../../Redux/Store";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import "./DeleteDish.css";

function DeleteDish(): JSX.Element {
  let [dishes, setDishes] = useState<DishModel[]>([]);
  let [token, setToken] = useState(store.getState().AuthState.auth.token);
  useEffect(() => {
    setToken(store.getState().AuthState.auth.token);
  }, []);

  const getMenu = () => {
    axios
      .get(globals.urls.localUrl + "order/getMenu")
      .then((response) => {
        setDishes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMenu();
  }, []);

  const handleDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#deleteDishForm"));
    const dishId = formData.get("dish");
    axios
      .delete(globals.urls.localUrl + "admin/deleteDish/" + dishId, {
        headers: { token: token },
      })
      .then((res) => {
        getMenu();
        alert(res.data);
      })
      .catch((err) => {
        errorAlert(err);
      });
  };
  return (
    <div className="DeleteDish">
      <h3>Delete Dish</h3>
      <Form id="deleteDishForm" onSubmit={handleDelete}>
        <Form.Group>
          <Form.Label>Select dish:</Form.Label>
          <Form.Control name="dish" as="select">
            {dishes.map((dish) => {
              return (
                <option key={dish.id} value={dish.id}>
                  {dish.id}) {dish.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Button type="submit">DELETE</Button>
      </Form>
      <br />
      <NavLink to="adminMenu">
        <Button>RETURN TO MENU</Button>
      </NavLink>
    </div>
  );
}

export default DeleteDish;
