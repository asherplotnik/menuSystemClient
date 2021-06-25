import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router";
import AdminMenu from "../AdminMenu/AdminMenu";
import DeleteDish from "../AdminMenu/DeleteDish/DeleteDish";
import NewDish from "../AdminMenu/NewDish/NewDish";
import UpdateDish from "../AdminMenu/UpdateDish/UpdateDish";
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
      <Route path="/" component={Login} exact />
    </Switch>
  );
}

export default Routing;
