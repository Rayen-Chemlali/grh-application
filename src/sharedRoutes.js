import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import AccessDeniedPage from "views/examples/accesDenied";
import AdminLayout from "views/Backoffice/Admin";

export const routes = [
  {
    path: "/profile-page",
    name: "Profile",
    icon: "tim-icons icon-single-02",
    component: <Profile />,
    layout: "/",
  },
  {
    path: "/register-page",
    name: "Register",
    icon: "tim-icons icon-badge",
    component: <Register />,
    layout: "/",
  },
  {
    path: "/login-page",
    name: "Login",
    icon: "tim-icons icon-key-25",
    component: <Login />,
    layout: "/",
  },
  {
    path: "/accessdenied",
    name: "Access Denied",
    icon: "tim-icons icon-lock-circle",
    component: <AccessDeniedPage />,
    layout: "/",
  },
  {
    path: "/admin",
    name: "Admin",
    icon: "tim-icons icon-settings",
    component: <AdminLayout />,
    layout: "/admin",
  },
  {
    path: "/",
    exact: true,
    name: "Landing",
    icon: "tim-icons icon-world",
    component: <Landing />,
    layout: "/",
  },
];

export default routes;
