import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); 
  const userData = JSON.parse(localStorage.getItem("userData"));
  const data = userData?.token
  console.log("userdata",data);
  const urlParams = new URLSearchParams(window.location.search);
  const tokens = urlParams?.get('token');
  if (tokens) {
    localStorage.setItem("userData", JSON.stringify({ token: tokens }));
  }
  console.log("datas", tokens);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = tokens || data;
        if (!token) {
          navigate("/"); 
          return;
        }
        const resData = await axios.get("https://musify-server-phi.vercel.app/login/success", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
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
