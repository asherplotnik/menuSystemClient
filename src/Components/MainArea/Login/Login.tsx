import { Button, Form } from "react-bootstrap";
import "./Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import globals from "../../../Services/Globals";
import CustomerModel from "../../../Models/CustomerModel";
import store from "../../../Redux/Store";
import { setAuthAction } from "../../../Redux/AuthState";
import { LevelEnum } from "../../../Models/Enums";
import { useHistory } from "react-router";
function Login(): JSX.Element {
  interface IFormInput {
    email: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const handleLogin = (loginDetails: IFormInput) => {
    axios
      .post<CustomerModel>(globals.urls.localUrl + "auth/signIn", loginDetails)
      .then((response) => {
        store.dispatch(setAuthAction(response.data));
        switch (response.data.level) {
          case LevelEnum.KITCHEN:
            history.push("/display");
            break;
          case LevelEnum.CUSTOMER:
            history.push("/makeOrder");
            break;
          case LevelEnum.ADMIN:
            history.push("/adminMenu");
            break;
        }
      });
  };
  const history = useHistory();
  return (
    <div className="Login Box">
      <h3 className="H3">Login</h3>
      <div className="FormDiv">
        <Form onSubmit={handleSubmit(handleLogin)}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              {...register("email", {
                required: { value: true, message: "Email missing" },
                pattern: {
                  value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g,
                  message: "Email is invalid",
                },
              })}
            />
            {errors.email && errors.email.message}
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="text"
              {...register("password", {
                required: { value: true, message: "Password missing" },
                minLength: { value: 3, message: "Too short" },
              })}
            />
            {errors.password && errors.password.message}
          </Form.Group>
          <Button type="submit" className="FormButton">
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
