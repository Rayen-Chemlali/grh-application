import React, { useEffect, useState } from "react";
import {  Outlet, useNavigate } from "react-router-dom";


const PrivateRoutes = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(true);

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem('token');
    if(userDataFromStorage===null)
    setUserData(false);
    console.log(userDataFromStorage);

  }, []);


  return !userData ? navigate('/accesDenied')  : <Outlet />  ;
};

export default PrivateRoutes;
