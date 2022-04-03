import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { API } from '../../../config/api';

const PrivateRoute = ({ element: components}) => {
  const [profile, setProfile] = useState();
  const getProfile = async () => {
    try {
      const response = await API.get("/user");
      setProfile(response.data.dataUser.status);
      console.log(response.data.dataUser.status);
    } catch (error) {}
  };
  profile === "Subscribe" ? <Outlet /> : <Navigate to="/afterlogin" />;
  useEffect(() => {
    getProfile();
  }, []);

  


};

export default PrivateRoute;
