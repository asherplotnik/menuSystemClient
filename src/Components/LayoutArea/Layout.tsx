import "./Layout.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header/Header";
import Routing from "../MainArea/Routing/Routing";
function Layout() {
  return (
    <BrowserRouter>
      <div className="Layout">
        <header>
          <Header />
        </header>
        <main>
          <Routing />
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default Layout;
