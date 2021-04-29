import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./MarkDish.css";

function MarkDish(): JSX.Element {
  return (
    <div className="MarkDish">
      <NavLink to="adminMenu">
        <Button>RETURN TO MENU</Button>
      </NavLink>
    </div>
  );
}

export default MarkDish;
