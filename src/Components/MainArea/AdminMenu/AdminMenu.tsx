import { SyntheticEvent } from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
  const handleHover = (e: SyntheticEvent) => {
    (e.target as HTMLElement).className =
      (e.target as HTMLElement).className + " HoveredItem";
  };
  const handleExit = (e: SyntheticEvent) => {
    (e.target as HTMLElement).className = (e.target as HTMLElement).className.slice(
      0,
      (e.target as HTMLElement).className.length - 11
    );
  };
  const navStyle = {
    textDecoration: "none",
    color: "black",
  };
  return (
    <div className="AdminMenu">
      <h3>Admin control panel</h3>
      <div className="List">
        <h4 style={{ textAlign: "center" }}>MENU</h4>
        <ListGroup>
          <NavLink style={navStyle} to="/newDish">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              Make new dish
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/updateDish">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              Update a dish
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/deleteDish">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              Delete a dish
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/markDish">
            <ListGroup.Item
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              Mark Dish unavailable
            </ListGroup.Item>
          </NavLink>
        </ListGroup>
        <br />
        <h4 style={{ textAlign: "center" }}>ORDERS</h4>
        <ListGroup>
          <NavLink style={navStyle} to="/orderDisplay">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              open orders
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/orderDisplay">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              ready orders
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/orderDisplay">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              served orders
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/orderDisplay">
            <ListGroup.Item
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              closed orders
            </ListGroup.Item>
          </NavLink>
        </ListGroup>
      </div>
    </div>
  );
}

export default AdminMenu;
