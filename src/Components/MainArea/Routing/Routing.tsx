import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router";
import AdminMenu from "../AdminMenu/AdminMenu";
import DeleteBranch from "../AdminMenu/DeleteBranch/DeleteBranch";
import DeleteDish from "../AdminMenu/DeleteDish/DeleteDish";
import DeleteUser from "../AdminMenu/DeleteUser/DeleteUser";
import NewBranch from "../AdminMenu/NewBranch/NewBranch";
import NewDish from "../AdminMenu/NewDish/NewDish";
import NewUser from "../AdminMenu/NewUser/NewUser";
import UpdateBranch from "../AdminMenu/UpdateBranch/UpdateBranch";
import UpdateDish from "../AdminMenu/UpdateDish/UpdateDish";
import UpdateUser from "../AdminMenu/UpdateUser/UpdateUser";
import Login from "../Login/Login";
import MakeOrder from "../MakeOrder/MakeOrder";
import OrderDisplay from "../OrderDisplay/OrderDisplay";
import PaidOrders from "../PaidOrders/PaidOrders";
import ReadyOrders from "../ReadyOrders/ReadyOrders";
import ServedOrders from "../ServedOrders/ServedOrders";
import "./Routing.css";

function Routing(): JSX.Element {
  return (
    <Switch>
      <Route path="/login" component={Login} exact />
      <Route path="/display" component={OrderDisplay} exact />
      <Route path="/ready" component={ReadyOrders} exact />
      <Route path="/served" component={ServedOrders} exact />
      <Route path="/paid" component={PaidOrders} exact />
      <Route path="/makeOrder" component={MakeOrder} exact />
      <Route path="/adminMenu" component={AdminMenu} exact />
      <Route path="/newDish" component={NewDish} exact />
      <Route path="/updateDish" component={UpdateDish} exact />
      <Route path="/deleteDish" component={DeleteDish} exact />
      <Route path="/newBranch" component={NewBranch} exact />
      <Route path="/updateBranch" component={UpdateBranch} exact />
      <Route path="/deleteBranch" component={DeleteBranch} exact />
      <Route path="/newUser" component={NewUser} exact />
      <Route path="/updateUser" component={UpdateUser} exact />
      <Route path="/deleteUser" component={DeleteUser} exact />
      <Route path="/" component={Login} exact />
    </Switch>
  );
}

export default Routing;
