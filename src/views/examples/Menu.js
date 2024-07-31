import React, { useEffect, useState } from 'react'; 
import CryptoJS from 'crypto-js';
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Nav,
  Media,
} from "reactstrap";
import axios from 'axios';

const PopupDemo = () => {
  const navigate = useNavigate();
  const [decryptedToken, setDecryptedToken] = useState(null);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
      setUsername(user.username);
      setRole(user.role.name);
      setProfile(user.profile);
      console.log("username", user.username);
      console.log(user.role.name);
    }

  }, []);

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
                src={profile && profile.image ? `http://localhost:3000/uploads/${profile.image}` : require("assets/img/theme/team-1-800x800.jpg")}
              />
            </span>
            <Media className="ml-2 d-none d-lg-block">
              <span className="mb-0 text-sm font-weight-bold">
                {username}
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
          {role === "admin" && (
            <DropdownItem to="/users" tag={Link}>
              <i className="ni ni-settings-gear-65" />
              <span>Users</span>
            </DropdownItem>
          )}
          {role === "admin" && (
            <DropdownItem to="/register-page" tag={Link}>
              <i className="ni ni-calendar-grid-58" />
              <span>Register</span>
            </DropdownItem>
          )}
          {role === "admin" && (
            <DropdownItem to="/profile" tag={Link}>
              <i className="ni ni-support-16" />
              <span>Add Profile</span>
            </DropdownItem>
          )}
          <DropdownItem divider />
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
