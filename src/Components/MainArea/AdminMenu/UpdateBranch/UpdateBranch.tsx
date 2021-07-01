import BranchModel from "../../../../Models/BranchModel";
import "./UpdateBranch.css";
import axios from "axios";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import store from "../../../../Redux/Store";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import { useCallback } from "react";

function UpdateBranch(): JSX.Element {
  let [token , setToken] = useState(store.getState().AuthState.auth.token);
  let [branches, setBranches] = useState<BranchModel[]>([]);
  let [fetchedBranch, setFetchedBranch] = useState<BranchModel>(null);
  let formRef = useRef(null);
  const handleFetch = () => {
    const formData = new FormData(formRef.current);
    const dishId = formData.get("updateDishId");
    axios
      .get<BranchModel>(globals.urls.localUrl + "admin/getBranch/" + dishId, {
        headers: { token: token}})
      .then((res) => {
        console.log(res.data);
        setFetchedBranch(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const newBranch = new BranchModel();
    newBranch.id = fetchedBranch.id;
    newBranch.name = formData.get("name") as string;
    newBranch.address = formData.get("address") as string;
    axios
      .put<BranchModel>(globals.urls.localUrl + "admin/updateBranch", newBranch, {
        headers: { token: token}})
      .then((res) => {
        console.log("response " + res.data);
        getBranches();
        alert("Branch Updated.");
      })
      .catch((err) => {
        errorAlert(err);
      });
  };

  const getBranches = useCallback(() => {
    axios
      .get(globals.urls.localUrl + "admin/getBranches", {
        headers: { token: token}})
      .then((response) => {
        setBranches(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[token]);

  useEffect(() => {
    setToken(store.getState().AuthState.auth.token);
    getBranches();
  }, [getBranches]);

  return (
    <div className="UpdateDish">
      <h3>Update Dish</h3>
      <div className="FormDish">
        <Form ref={formRef} onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Select dish:</Form.Label>
            <Form.Control name="updateDishId" as="select">
              {branches.map((branch) => {
                return (
                  <option key={branch.id} value={branch.id}>
                    {branch.id}) {branch.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button type="button" onClick={handleFetch}>
            Fetch
          </Button>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              defaultValue={fetchedBranch?.name}
              name="name"
              required
              minLength={4}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={fetchedBranch?.address}
              name="address"
              minLength={25}
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
  )
}

export default UpdateBranch;
