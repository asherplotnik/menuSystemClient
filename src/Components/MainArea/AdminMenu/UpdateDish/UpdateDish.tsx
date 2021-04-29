import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DishModel from "../../../../Models/DishModel";
import { CategoryEnum } from "../../../../Models/Enums";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import "./UpdateDish.css";

function UpdateDish(): JSX.Element {
  const token = store.getState().AuthState.auth.token;
  let [fetchedDish, setFetchedDish] = useState<DishModel>(null);
  const handleCategory = (e: SyntheticEvent) => {
    let temp = { ...fetchedDish };
    temp.category = (e.target as HTMLInputElement).value as CategoryEnum;
    setFetchedDish(temp);
  };
  const handleFetch = () => {
    let updateId = +(document.querySelector(
      "#updateDishId"
    ) as HTMLInputElement).value;
    axios
      .get<DishModel>(globals.urls.localUrl + "order/getDish/" + updateId)
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
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="NewDish">
      <h3>Update Dish</h3>
      <div className="FormDish">
        <Form id="updateFormId" onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>ID:</Form.Label>
            <Form.Control id="updateDishId" name="id" />
          </Form.Group>
          <Button type="button" onClick={handleFetch}>
            Fetch
          </Button>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control defaultValue={fetchedDish?.name} name="name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>description:</Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={fetchedDish?.description}
              name="description"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control defaultValue={fetchedDish?.price} name="price" />
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

          <Form.Group controlId="availableCheck">
            <Form.Check
              type="checkbox"
              label="Available"
              value="on"
              name="available"
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
