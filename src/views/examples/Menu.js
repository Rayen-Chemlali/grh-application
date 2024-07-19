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




const PopupDemo = () => {


    const navigate = useNavigate();
    const [decryptedToken, setDecryptedToken] = useState(null);

    useEffect(() => {
      const encryptedToken = localStorage.getItem('token');
      const secretKey = 'abc123';
  
      const decryptToken = (token, key) => {
        try {
          const bytes = CryptoJS.AES.decrypt(token, key);
          const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
          return JSON.parse(decryptedData);
        } catch (e) {
          console.error('Failed to decrypt token', e);
          return null;
        }
      };
  
      if (encryptedToken) {
        const tokenData = decryptToken(encryptedToken, secretKey);
        setDecryptedToken(tokenData);
      }
      console.log("token read",encryptedToken)
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login-page");
    } 
 

    return (
        <Nav className="align-items-center d-none d-md-flex" navbar>
        <UncontrolledDropdown nav>
          <DropdownToggle className="pr-0" nav>
            <Media className="align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src={require("../../assets/img/theme/team-1-800x800.jpg")}
                />
              </span>
              <Media className="ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm font-weight-bold">
                  oussema amri
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
            <DropdownItem to="/users" tag={Link}>
              <i className="ni ni-settings-gear-65" />
              <span>Users</span>
            </DropdownItem>
            <DropdownItem to="/register-page" tag={Link}>
              <i className="ni ni-calendar-grid-58" />
              <span>Register</span>
            </DropdownItem>
            <DropdownItem to="/admin/user-profile" tag={Link}>
              <i className="ni ni-support-16" />
              <span>Support</span>
            </DropdownItem>
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
