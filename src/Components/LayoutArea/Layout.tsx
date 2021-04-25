import "./Layout.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import OrderDisplay from "../MainArea/OrderDisplay/OrderDisplay";
import MakeOrder from "../MainArea/MakeOrder/MakeOrder";
import Login from "../MainArea/Login/Login";
function Layout() {
  return (
    <BrowserRouter>
      <div className="Layout">
        <header></header>
        <main>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/display" component={OrderDisplay} exact />
            <Route path="/makeOrder" component={MakeOrder} exact />
          </Switch>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default Layout;
