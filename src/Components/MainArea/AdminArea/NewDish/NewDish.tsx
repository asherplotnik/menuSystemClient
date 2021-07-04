import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import DishModel from "../../../../Models/DishModel";
import { CategoryEnum } from "../../../../Models/Enums";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import "./NewDish.css";

function NewDish(): JSX.Element {
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
    jwtAxios
      .post<DishModel>(globals.urls.localUrl + "admin/addDish", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data);
        alert("Dish added.");
      })
      .catch((err) => {
        errorAlert(err);
      });
  };
  return (
    <div className="NewDish">
      <h3>Add New Dish</h3>
      <div className="FormDish">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              {...register("name", {
                required: { value: true, message: "please enter name" },
                minLength: {
                  value: 5,
                  message: "please enter longer description",
                },
              })}
            />
            <span>{errors.name?.message}</span>
          </Form.Group>
          <Form.Group>
            <Form.Label>description:</Form.Label>
            <Form.Control
              as="textarea"
              {...register("description", {
                required: { value: true, message: "please enter description" },
                minLength: {
                  value: 25,
                  message: "please enter longer description",
                },
              })}
            />
            <span>{errors.description?.message}</span>
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control
              {...register("price", {
                min: { value: 1, message: "price too low" },
                required: { value: true, message: "please enter price" },
              })}
            />
            <span>{errors.price?.message}</span>
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
              {...register("image1", {
                required: { value: true, message: "file was not selected" },
              })}
            />
            <span>{errors.image1?.message}</span>
          </Form.Group>
          <Form.Group>
            <Form.File
              id="ControlFile2"
              label="Choose secondary image"
              {...register("image2", {
                required: { value: true, message: "file was not selected" },
              })}
            />
            <span>{errors.image2?.message}</span>
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        <br />
      </div>
    </div>
  );
}

export default NewDish;
