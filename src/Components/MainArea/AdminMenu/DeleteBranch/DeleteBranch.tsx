import "./DeleteBranch.css";
import axios from "axios";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import store from "../../../../Redux/Store";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import BranchModel from "../../../../Models/BranchModel";
import { useCallback } from "react";
function DeleteBranch(): JSX.Element {
    let [branches, setBranches] = useState<BranchModel[]>([]);
    let [token, setToken] = useState(store.getState().AuthState.auth.token);
    let formRef = useRef(null);
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
  },[token])
  
  useEffect(() => {
    getBranches();
  },[getBranches]);
  
  useEffect(() => {
    setToken(store.getState().AuthState.auth.token);
  }, []);

  const handleDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const branchId = formData.get("branch");
    axios
      .delete(globals.urls.localUrl + "admin/deleteBranch/" + branchId, {
        headers: { token: token },
      })
      .then((res) => {
          getBranches();
          alert(res.data);
      })
      .catch((err) => {
        errorAlert(err);
      });
  };
  return (
    <div className="DeleteBranch">
      <h3>Delete Dish</h3>
      <Form ref={formRef} onSubmit={handleDelete}>
        <Form.Group>
          <Form.Label>Select dish:</Form.Label>
          <Form.Control name="branch" as="select">
            {branches.map((branch) => {
              return (
                <option key={branch.id} value={branch.id}>
                  {branch.id}) {branch.name}
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

export default DeleteBranch;
