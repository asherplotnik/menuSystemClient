import BranchModel from "../../../../Models/BranchModel";
import "./UpdateBranch.css";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";

function UpdateBranch(): JSX.Element {
  let [branches, setBranches] = useState<BranchModel[]>([]);
  let [fetchedBranch, setFetchedBranch] = useState<BranchModel>(null);
  let formRef = useRef(null);
  const handleFetch = () => {
    const formData = new FormData(formRef.current);
    const dishId = formData.get("updateDishId");
    jwtAxios
      .get<BranchModel>(globals.urls.localUrl + "admin/getBranch/" + dishId)
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
    jwtAxios
      .put<BranchModel>(globals.urls.localUrl + "admin/updateBranch", newBranch)
      .then((res) => {
        console.log("response " + res.data);
        getBranches();
        alert("Branch Updated.");
      })
      .catch((err) => {
        errorAlert(err);
      });
  };

  const getBranches = () => {
    jwtAxios
      .get(globals.urls.localUrl + "admin/getBranches")
      .then((response) => {
        setBranches(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBranches();
  }, []);

  return (
    <div className="UpdateBranch">
      <h3>Update Branch</h3>
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
    </div>
  )
}

export default UpdateBranch;
