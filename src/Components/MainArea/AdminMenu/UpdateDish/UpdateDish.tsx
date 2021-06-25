import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DishModel from "../../../../Models/DishModel";
import { CategoryEnum } from "../../../../Models/Enums";
import store from "../../../../Redux/Store";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import "./UpdateDish.css";

function UpdateDish(): JSX.Element {
  const token = store.getState().AuthState.auth.token;
  let [dishes, setDishes] = useState<DishModel[]>([]);
  let [fetchedDish, setFetchedDish] = useState<DishModel>(null);
  const handleCategory = (e: SyntheticEvent) => {
    let temp = { ...fetchedDish };
    temp.category = (e.target as HTMLInputElement).value as CategoryEnum;
    setFetchedDish(temp);
  };

  const handleCheck = () => {
    console.log(fetchedDish.available);
    let temp = { ...fetchedDish };
    temp.available = !temp.available;
    setFetchedDish(temp);
  };
  const handleFetch = () => {
    const formData = new FormData(document.querySelector("#updateFormId"));
    const dishId = formData.get("updateDishId");
    axios
      .get<DishModel>(globals.urls.localUrl + "order/getDish/" + dishId)
      .then((res) => {
        console.log(res.data);
        setFetchedDish(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#updateFormId"));
    formData.set("id", fetchedDish.id.toString());
    axios
      .put<DishModel>(globals.urls.localUrl + "admin/updateDish", formData, {
        headers: { token: token, "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("response " + res.data);
        getMenu();
        alert("Dish Updated.");
      })
      .catch((err) => {
        errorAlert(err);
      });
  };

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

  return (
    <div className="UpdateDish">
      <h3>Update Dish</h3>
      <div className="FormDish">
        <Form id="updateFormId" onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Select dish:</Form.Label>
            <Form.Control name="updateDishId" as="select">
              {dishes.map((dish) => {
                return (
                  <option key={dish.id} value={dish.id}>
                    {dish.id}) {dish.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button type="button" onClick={handleFetch}>
            Fetch
          </Button>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              defaultValue={fetchedDish?.name}
              name="name"
              required
              minLength={4}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>description:</Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={fetchedDish?.description}
              name="description"
              minLength={25}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control
              defaultValue={fetchedDish?.price}
              name="price"
              required
              min="1"
            />
          </Form.Group>
          <Form.Group controlId="updateDishForm.category">
            <Form.Label>Category:</Form.Label>
            <Form.Control
              value={fetchedDish?.category}
              onChange={handleCategory}
              as="select"
              name="category"
            >
              <option value={CategoryEnum.DRINK}>Drink</option>
              <option value={CategoryEnum.STARTER}>Starters</option>
              <option value={CategoryEnum.SIDE_DISH}>Side dish</option>
              <option value={CategoryEnum.SOUP}>Soup</option>
              <option value={CategoryEnum.MAIN_COURSE}>Main course</option>
              <option value={CategoryEnum.DESSERT}>Dessert</option>
            </Form.Control>
          </Form.Group>
          <div className="FlexDiv">
            <div>
              <Form.Group controlId="availableCheck">
                <Form.Check
                  type="checkbox"
                  label="Available"
                  value="on"
                  name="available"
                  checked={fetchedDish?.available}
                  onChange={handleCheck}
                />
              </Form.Group>
              <Form.Group>
                <Form.File
                  id="ControlFile1"
                  label="Choose primary image"
                  name="image1"
                />
              </Form.Group>
              <Form.Group>
                <Form.File
                  id="ControlFile2"
                  label="Choose secondary image"
                  name="image2"
                />
              </Form.Group>
            </div>
            <div>
              <img src={fetchedDish?.primaryImage} alt="primary" />
            </div>
            <div>
              <img src={fetchedDish?.secondaryImage} alt="secondary" />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </Form>
        <br />
      </div>
      <NavLink to="adminMenu">
        <Button type="button">RETURN TO MENU</Button>
      </NavLink>
    </div>
  );
}

export default UpdateDish;
