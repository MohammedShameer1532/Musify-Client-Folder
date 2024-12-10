import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const resData = await axios.get("https://musify-server-three.vercel.app/login/success", {
          withCredentials: true,
        });
        if (resData.status === 200) {
          setIsAuthenticated(true);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Unable to fetch user details", error);
        navigate("/");
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoutes;
