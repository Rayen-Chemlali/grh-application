// PopupDemo.js
import React from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Nav,
  Media,
} from "reactstrap";

import useLocalStorage from '../../useLocalStorage'; 

const PopupDemo = () => {
  const navigate = useNavigate();
  const user = useLocalStorage('user'); // Use the custom hook to get user data

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/login-page");
  };

  return (
    <Nav className="align-items-center d-none d-md-flex" navbar>
      <UncontrolledDropdown nav>
        <DropdownToggle className="pr-0" nav>
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img
                alt="..."
                src={user?.profile?.image ? `http://localhost:3000/uploads/${user.profile.image}` : require("assets/img/theme/team-1-800x800.jpg")}
              />
            </span>
            <Media className="ml-2 d-none d-lg-block">
              <span className="mb-0 text-sm font-weight-bold">
                {user?.username}
              </span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          <DropdownItem to="/profile-page" tag={Link}>
            <i className="ni ni-single-02" />
            <span>My profile</span>
          </DropdownItem>
          {user?.role?.name === "admin" && (
            <DropdownItem to="/users" tag={Link}>
              <i className="ni ni-settings-gear-65" />
              <span>Users</span>
            </DropdownItem>
          )}
          {user?.role?.name === "admin" && (
            <DropdownItem to="/register-page" tag={Link}>
              <i className="ni ni-calendar-grid-58" />
              <span>Register</span>
            </DropdownItem>
          )}
          {user?.role?.name === "admin" && (
            <DropdownItem to="/profile" tag={Link}>
              <i className="ni ni-support-16" />
              <span>Add Profile</span>
            </DropdownItem>
          )} 
          {(user?.role?.name === "admin" | user?.role?.name === "manager")  && (
            <DropdownItem to="/manage" tag={Link}>
              <i className="ni ni-support-16" />
              <span>manage conge</span>
            </DropdownItem>
          )}
            <DropdownItem to="/viewconge" tag={Link}>
              <i className="ni ni-calendar-grid-58" />
              <span>view conge</span>
            </DropdownItem>
        
          <DropdownItem to="/goals" tag={Link}>
              <i className="ni ni-calendar-grid-58" />
              <span>annual-goal</span>
            </DropdownItem>
                    
          <DropdownItem to="/project" tag={Link}>
              <i className="ni ni-calendar-grid-58" />
              <span>project</span>
            </DropdownItem>
          <DropdownItem divider />

          {user?.role?.name === "admin" && (
              <DropdownItem to="/add-evaluation-page" tag={Link}>
                <i className="ni ni-ruler-pencil" />
                <span>Add Evaluation</span>
              </DropdownItem>
          )}

          {user?.role?.name === "manager" && (
              <DropdownItem to="/manager-evaluation-page" tag={Link}>
                <i className="ni ni-ruler-pencil" />
                <span>Manage Evaluations</span>
              </DropdownItem>
          )}

          <DropdownItem to="/employee-evaluation-page" tag={Link}>
            <i className="ni ni-check-bold" />
            <span>View Evaluations</span>
          </DropdownItem>


          <DropdownItem href="#pablo" onClick={handleLogout}>
            <i className="ni ni-user-run" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  );
};

export default PopupDemo;
