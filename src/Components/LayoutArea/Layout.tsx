import "./Layout.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import OrderDisplay from "../MainArea/OrderDisplay/OrderDisplay";
import MakeOrder from "../MainArea/MakeOrder/MakeOrder";
function Layout() {
  return (
    <BrowserRouter>
      <div className="Layout">
        <header></header>
        <main>
          <Switch>
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