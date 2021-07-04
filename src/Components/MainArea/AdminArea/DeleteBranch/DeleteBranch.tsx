import "./DeleteBranch.css";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import BranchModel from "../../../../Models/BranchModel";
import jwtAxios from "../../../../Services/jwtAxios";
function DeleteBranch(): JSX.Element {
    let [branches, setBranches] = useState<BranchModel[]>([]);
    let formRef = useRef(null);
  const getBranches = () => {
    jwtAxios
      .get(globals.urls.localUrl + "admin/getBranches")
      .then((response) => {
        setBranches(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  useEffect(() => {
    getBranches();
  },[]);
  
  const handleDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const branchId = formData.get("branch");
    jwtAxios
      .delete(globals.urls.localUrl + "admin/deleteBranch/" + branchId)
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
    </div>
  );
}

export default DeleteBranch;
