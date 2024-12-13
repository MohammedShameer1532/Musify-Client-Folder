import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const resData = await axios.get("https://musify-server-phi.vercel.app/login/success", {
          withCredentials: true,
        });
        console.log(resData);
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
if (isAuthenticated === null) {
    return <div>Loading...</div>; // Loading state while checking authentication
  }
  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoutes;
