import "./DeleteUser.css";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import UserModel from "../../../../Models/UserModel";
import jwtAxios from "../../../../Services/jwtAxios";
function DeleteUser(): JSX.Element {
    let [users, setUsers] = useState<UserModel[]>([]);
    let formRef = useRef(null);
    const getUsers = () => {
      jwtAxios
          .get(globals.urls.localUrl + "admin/getUsers")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      
      useEffect(() => {
        getUsers();
      },[]);
      
      const handleDelete = (e: SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const userId = formData.get("user");
        jwtAxios
          .delete(globals.urls.localUrl + "admin/deleteUser/" + userId)
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
        </div>
    );
}

export default DeleteUser;
