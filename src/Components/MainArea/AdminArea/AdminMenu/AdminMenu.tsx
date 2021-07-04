import { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
  const [showSide, setShowSide] = useState("");
  const toggleSide = () =>{
    if (showSide === " ShowSide"){
      setShowSide(""); 
    } else{
      setShowSide(" ShowSide");
    }
  }
  return (
    <>
      <div className="AdminMenu">
        <Button onClick={toggleSide}>Menu</Button><br/><br/>
        <Nav className={"col-md-12 d-none d-md-block Sidebar"+ showSide}>
          <h6>ORDERS</h6>
          <Nav.Item>
            <NavLink  to="/display">
              open orders
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              to="/ready"
            >
              ready orders
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/served">
              served orders
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/paid">
              closed orders
            </NavLink>
          </Nav.Item>
          <br />
          <h6>BRANCHES</h6>
          <Nav.Item>
            <NavLink to="/admin/newBranch">
              Add new branch
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/admin/updateBranch">
              Update a branch
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/admin/deleteBranch">
              Delete a branch
            </NavLink>
          </Nav.Item>
          <br />
          <h6>MENU</h6>
          <Nav.Item>
            <NavLink to="/admin/newDish">
              Add new dish
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/admin/updateDish">
              Update a dish
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/admin/deleteDish">
              Delete a dish
            </NavLink>
          </Nav.Item>
          <br />
          <h6>USERS</h6>
          <Nav.Item>
            <NavLink to="/admin/newUser">
              Add new user
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/admin/updateUser">
              Update a user
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/admin/deleteUser">
              Delete a user
            </NavLink>
          </Nav.Item>
        </Nav>
        </div>
    </>
  );
}

export default AdminMenu;
