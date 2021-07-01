import "./NewBranch.css";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import store from "../../../../Redux/Store";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import BranchModel from "../../../../Models/BranchModel";

function NewBranch(): JSX.Element {
  const onSubmit = (data: BranchModel) => {
    axios
      .post<BranchModel>(globals.urls.localUrl + "admin/addBranch", data, {
        headers: { token: token },
      })
      .then((response) => {
        console.log(response.data);
        alert("Branch added.");
      })
      .catch((err) => {
        errorAlert(err);
      });
  };
  const token = store.getState().AuthState.auth.token;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BranchModel>();

  return (
    <div className="NewBranch">
      <h3>Add New Branch</h3>
      <div className="FormBranch">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              {...register("name", {
                required: { value: true, message: "please enter name" },
                minLength: {
                  value: 5,
                  message: "please enter longer name",
                },
              })}
            />
            <span>{errors.name?.message}</span>
          </Form.Group>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              as="textarea"
              {...register("address", {
                required: { value: true, message: "please enter address" },
                minLength: {
                  value: 25,
                  message: "please enter longer address",
                },
              })}
            />
            <span>{errors.address?.message}</span>
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

export default NewBranch;
