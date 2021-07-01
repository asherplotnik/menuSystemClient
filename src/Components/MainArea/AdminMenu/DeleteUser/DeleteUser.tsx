import "./DeleteUser.css";
import axios from "axios";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import store from "../../../../Redux/Store";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import { useCallback } from "react";
import UserModel from "../../../../Models/UserModel";
function DeleteUser(): JSX.Element {
    let [users, setUsers] = useState<UserModel[]>([]);
    let [token, setToken] = useState(store.getState().AuthState.auth.token);
    let formRef = useRef(null);
    const getUsers = useCallback(() => {
        axios
          .get(globals.urls.localUrl + "admin/getUsers", {
            headers: { token: token },
          })
          .then((response) => {
            setUsers(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      },[token])
      
      useEffect(() => {
        getUsers();
      },[getUsers]);
      
      useEffect(() => {
        setToken(store.getState().AuthState.auth.token);
      }, []);

      const handleDelete = (e: SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const userId = formData.get("user");
        axios
          .delete(globals.urls.localUrl + "admin/deleteUser/" + userId, {
            headers: { token: token },
          })
          .then((res) => {
            getUsers();
            alert(res.data);
          })
          .catch((err) => {
            errorAlert(err);
          });
      };

    return (
        <div className="DeleteUser">
		<h3>Delete User</h3>
      <Form ref={formRef} onSubmit={handleDelete}>
        <Form.Group>
          <Form.Label>Select dish:</Form.Label>
          <Form.Control name="user" as="select">
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.id}) {user.name}
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

export default DeleteUser;
