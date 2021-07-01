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
    if ((e.target as HTMLElement).className.includes("HoveredItem")) {
      (e.target as HTMLElement).className = (e.target as HTMLElement).className.slice(
        0,
        (e.target as HTMLElement).className.length - 11
      );
    }
  };
  const navStyle = {
    textDecoration: "none",
    color: "black",
  };
  return (
    <div className="AdminMenu">
      <h3>Admin control panel</h3>
      <div className="List">
        <h4 style={{ textAlign: "center" }}>ORDERS</h4>
        <ListGroup>
          <NavLink style={navStyle} to="/display">
            <ListGroup.Item
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              open orders
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/ready">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              ready orders
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/served">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              served orders
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/paid">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              closed orders
            </ListGroup.Item>
          </NavLink>
        </ListGroup>
        <br />
        <h4 style={{ textAlign: "center" }}>BRANCHES</h4>
        <ListGroup>
          <NavLink style={navStyle} to="/newBranch">
            <ListGroup.Item
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              Add new branch
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/updateBranch">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              Update a branch
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/deleteBranch">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              Delete a branch
            </ListGroup.Item>
          </NavLink>
        </ListGroup>
        <br />
        <h4 style={{ textAlign: "center" }}>MENU</h4>
        <ListGroup>
          <NavLink style={navStyle} to="/newDish">
            <ListGroup.Item
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              Add new dish
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
        </ListGroup>
        <br />
        <h4 style={{ textAlign: "center" }}>USERS</h4>
        <ListGroup>
          <NavLink style={navStyle} to="/newUser">
            <ListGroup.Item
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              Add new user
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/updateUser">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              Update a user
            </ListGroup.Item>
          </NavLink>
          <NavLink style={navStyle} to="/deleteUser">
            <ListGroup.Item
              className="NavLink"
              onMouseEnter={handleHover}
              onMouseLeave={handleExit}
            >
              Delete a user
            </ListGroup.Item>
          </NavLink>
        </ListGroup>
      </div>
    </div>
  );
}

export default AdminMenu;
