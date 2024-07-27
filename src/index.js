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
import AccessDeniedPage from "views/examples/accesDenied";
import PrivateRoutes from "utils/privateRoutes";
import UserTablePage from "./views/Backoffice/UserTablePage";
import AddProfile from "views/Backoffice/AddProfile";
import DocumentManagementPage from "./views/Backoffice/DocumentManagemntPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/aa" element={<PrivateRoutes />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile-page" element={<Profile />} />
          <Route path="/register-page" element={<Register />} />
          <Route path="/users" element={<UserTablePage />} />
          <Route path="/profile" element={<AddProfile />} />
          <Route path="/documents/:userId" element={<DocumentManagementPage />} />
        </Route>
        <Route path="/" element={<Landing />} />
        <Route path="/index" element={<Index />} />
        <Route path="/home-page" element={<Landing />} />
        <Route path="/login-page" element={<Login />} />
        <Route path="/accesDenied" element={<AccessDeniedPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
);
