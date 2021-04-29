import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./DeleteDish.css";

function DeleteDish(): JSX.Element {
  return (
    <div className="DeleteDish">
      <NavLink to="adminMenu">
        <Button>RETURN TO MENU</Button>
      </NavLink>
    </div>
  );
}

export default DeleteDish;
