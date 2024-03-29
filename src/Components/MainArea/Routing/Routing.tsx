import { Switch,Route } from "react-router-dom";
import Admin from "../AdminArea/Admin/Admin";
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
      <Route path="/admin" component={Admin} />
      <Route path="/" component={Login} exact />
    </Switch>
  );
}

export default Routing;
