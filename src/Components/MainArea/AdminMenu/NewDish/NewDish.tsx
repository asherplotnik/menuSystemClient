import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import DishModel from "../../../../Models/DishModel";
import { CategoryEnum } from "../../../../Models/Enums";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import "./NewDish.css";

function NewDish(): JSX.Element {
  const token = store.getState().AuthState.auth.token;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DishModel>();

  const onSubmit = (data: DishModel) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category.toString());
    formData.append("price", data.price.toString());
    formData.append("available", data.available.toString());
    formData.append("image1", data.image1.item(0));
    formData.append("image2", data.image2.item(0));
    axios
      .post<DishModel>(globals.urls.localUrl + "admin/addDish", formData, {
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
      <h3>Add New Dish</h3>
      <div className="FormDish">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control {...register("name")} />
          </Form.Group>
          <Form.Group>
            <Form.Label>description:</Form.Label>
            <Form.Control as="textarea" {...register("description")} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control {...register("price")} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category:</Form.Label>
            <Form.Control as="select" {...register("category")}>
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
              {...register("available")}
            />
          </Form.Group>
          <Form.Group>
            <Form.File
              id="ControlFile1"
              label="Choose primary image"
              {...register("image1")}
            />
          </Form.Group>
          <Form.Group>
            <Form.File
              id="ControlFile2"
              label="Choose secondary image"
              {...register("image2")}
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

export default NewDish;
