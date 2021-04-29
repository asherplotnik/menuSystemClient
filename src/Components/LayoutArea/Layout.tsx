import "./Layout.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import OrderDisplay from "../MainArea/OrderDisplay/OrderDisplay";
import MakeOrder from "../MainArea/MakeOrder/MakeOrder";
import Login from "../MainArea/Login/Login";
import AdminMenu from "../MainArea/AdminMenu/AdminMenu";
import NewDish from "../MainArea/AdminMenu/NewDish/NewDish";
import DeleteDish from "../MainArea/AdminMenu/DeleteDish/DeleteDish";
import UpdateDish from "../MainArea/AdminMenu/UpdateDish/UpdateDish";
import MarkDish from "../MainArea/AdminMenu/MarkDish/MarkDish";
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
            <Route path="/adminMenu" component={AdminMenu} exact />
            <Route path="/newDish" component={NewDish} exact />
            <Route path="/updateDish" component={UpdateDish} exact />
            <Route path="/deleteDish" component={DeleteDish} exact />
            <Route path="/markDish" component={MarkDish} exact />
            <Route path="/" component={Login} />
          </Switch>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default Layout;
