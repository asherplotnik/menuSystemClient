import "./NewUser.css";
import CustomerModel from "../../../../Models/CustomerModel";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import store from "../../../../Redux/Store";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import { LevelEnum } from "../../../../Models/Enums";
import BranchModel from "../../../../Models/BranchModel";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
function NewUser(): JSX.Element {
  let [branches, setBranches] = useState<BranchModel[]>([]);
  let [token, setToken] = useState(store.getState().AuthState.auth.token);
  let [disableField, setDisableField] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerModel>();
  const getBranches = useCallback(() => {
    axios
      .get(globals.urls.localUrl + "admin/getBranches", {
        headers: { token: token },
      })
      .then((response) => {
        setBranches(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    getBranches();
  }, [getBranches]);

  useEffect(() => {
    setToken(store.getState().AuthState.auth.token);
  }, []);

const handleLevel = (e:ChangeEvent<HTMLInputElement>) => {
  if (e.target.value === LevelEnum.CUSTOMER){
    setDisableField("customer")
  } else if (e.target.value === LevelEnum.ADMIN) {
     setDisableField("admin");
  } else {
    setDisableField("");
  }
}


  const onSubmit = (data: CustomerModel) => {
    axios
      .post<CustomerModel>(globals.urls.localUrl + "admin/addUser/"+data.branchId, data, {
        headers: { token: token},
      })
      .then((response) => {
        console.log(response.data);
        alert("User added.");
      })
      .catch((err) => {
        errorAlert(err);
      });
  };

  return (
    <div className="NewUser">
      <h3>Add New User</h3>
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
                }
              })}
            />
            <span>{errors.name?.message}</span>
          </Form.Group>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              as="textarea"
              disabled={disableField !== "customer"}
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
          <Form.Group>
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              disabled={disableField !== "customer"}
              {...register("phone", {
                required: { value: true, message: "please enter phone" },
                minLength: {
                  value: 9,
                  message: "please enter longer phone number",
                },
              })}
            />
            <span>{errors.phone?.message}</span>
          </Form.Group>
          <Form.Group>
            <Form.Label>Level:</Form.Label>
            <Form.Control
              as="select"
              {...register("level", {
                required: { value: true, message: "please enter level" },
              })}
              onChange={handleLevel}
            >
              <option value={LevelEnum.NONE}>--Choose one--</option>
              <option value={LevelEnum.TABLE}>Table</option>
              <option value={LevelEnum.CUSTOMER}>Customer</option>
              <option value={LevelEnum.KITCHEN}>Kitchen</option>
              <option value={LevelEnum.SERVICE}>Service</option>
              <option value={LevelEnum.ADMIN}>Admin</option>
            </Form.Control>
            <span>{errors.phone?.message}</span>
          </Form.Group>
          <Form.Group>
            <Form.Label>Branch:</Form.Label>
            <Form.Control name="branchId" as="select"
               disabled={disableField === "admin"}
               {...register("branchId", {
                required: { value: true, message: "please enter branch" },
              })}>
              {branches.map((branch) => {
                return (
                  <option key={branch.id} value={branch.id}>
                    {branch.id}) {branch.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              {...register("email", {
                required: { value: true, message: "please enter email" },
              })}
            />
            <span>{errors.email?.message}</span>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              {...register("password", {
                required: { value: true, message: "please enter password" },
              })}
            />
            <span>{errors.password?.message}</span>
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

export default NewUser;
