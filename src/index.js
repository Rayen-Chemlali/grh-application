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
import LeaveManagement from "views/Backoffice/LeaveManagement";
import SubmitLeaveRequest from "views/Backoffice/SubmitLeaveRequest";
import ApproveRejectLeaveRequest from "views/Backoffice/ApproveRejectLeaveRequest";
import ViewLeaveRequests from "views/Backoffice/ViewLeaveRequests";
import ViewAnnualGoals from "views/Backoffice/ViewAnnualGoals ";
import ViewProjects from "views/Backoffice/ViewProjects";
import ManagerEvaluationPage from "./views/Backoffice/ManagerEvaluationPage";
import EmployeeEvaluationPage from "./views/Backoffice/EmployeeEvaluationPage";
import EvaluationForm from "./components/EvaluationManagement/EvaluationForm";
import EvaluationPage from "./views/Backoffice/EvaluationPage";

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
          <Route path="/manage" element={<ApproveRejectLeaveRequest />} />
          <Route path="/viewconge" element={<ViewLeaveRequests />} />
          <Route path="/goals" element={<ViewAnnualGoals />} />
          <Route path="/project" element={<ViewProjects />} />
          <Route path="/manager-evaluation-page" element={<ManagerEvaluationPage />} />
          <Route path="/add-evaluation-page" element={<EvaluationPage />} />
          <Route path="/employee-evaluation-page" element={<EmployeeEvaluationPage />} />
        </Route> 
        <Route path="/" element={<Landing />} />
        <Route path="/leav" element={<LeaveManagement />} />
        <Route path="/index" element={<Index />} />
        <Route path="/home-page" element={<Landing />} />
        <Route path="/login-page" element={<Login />} />
        <Route path="/accesDenied" element={<AccessDeniedPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
);
