/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import { Alert } from "reactstrap";
import AccessDeniedPage from "views/examples/accesDenied";
import PrivateRoutes from "utils/privateRoutes"




const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
    <Route path="/aa" exact element={<PrivateRoutes />} />
      <Route element={<PrivateRoutes />}>
         <Route path="/profile-page" exact element={<Profile />} />
         <Route path="/register-page" exact element={<Register />} />
      </Route>
      <Route path="/" exact element={<Landing />} />
      <Route path="/index" exact element={<Index />} />
      <Route path="/home-page" exact element={<Landing />} />
      <Route path="/login-page" exact element={<Login />} />

      <Route path="/error-page" exact element={<Alert />} />
      <Route path="/accesDenied" element={<AccessDeniedPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
