import "./NewBranch.css";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import BranchModel from "../../../../Models/BranchModel";
import jwtAxios from "../../../../Services/jwtAxios";

function NewBranch(): JSX.Element {
  const onSubmit = (data: BranchModel) => {
    jwtAxios
      .post<BranchModel>(globals.urls.localUrl + "admin/addBranch", data)
      .then((response) => {
        console.log(response.data);
        alert("Branch added.");
      })
      .catch((err) => {
        errorAlert(err);
      });
  };
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
    </div>
  );
}

export default NewBranch;
