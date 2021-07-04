import "./Admin.css";
import { Switch, Route } from "react-router-dom";
import DeleteBranch from "../DeleteBranch/DeleteBranch";
import DeleteDish from "../DeleteDish/DeleteDish";
import DeleteUser from "../DeleteUser/DeleteUser";
import NewBranch from "../NewBranch/NewBranch";
import NewDish from "../NewDish/NewDish";
import NewUser from "../NewUser/NewUser";
import UpdateBranch from "../UpdateBranch/UpdateBranch";
import UpdateDish from "../UpdateDish/UpdateDish";
import UpdateUser from "../UpdateUser/UpdateUser";
import AdminMenu from "../AdminMenu/AdminMenu";
function Admin(): JSX.Element {
  return (
    <div className="Admin">
      <h3 style={{ textAlign: "center" }}>Admin control panel</h3>
      <AdminMenu />
      <div className="AdminMain">
      <Switch>
        <Route path="/admin/newDish" component={NewDish} exact />
        <Route path="/admin/updateDish" component={UpdateDish} exact />
        <Route path="/admin/deleteDish" component={DeleteDish} exact />
        <Route path="/admin/newBranch" component={NewBranch} exact />
        <Route path="/admin/updateBranch" component={UpdateBranch} exact />
        <Route path="/admin/deleteBranch" component={DeleteBranch} exact />
        <Route path="/admin/newUser" component={NewUser} exact />
        <Route path="/admin/updateUser" component={UpdateUser} exact />
        <Route path="/admin/deleteUser" component={DeleteUser} exact />
      </Switch>
      </div>
    </div>
  );
}

export default Admin;
