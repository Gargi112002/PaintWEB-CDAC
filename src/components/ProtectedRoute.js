import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {LogContext } from '../context/LogContext';

const ProtectedRoute = ({ element }) => {

  const { isLoggedIn, setIsLoggedIn } = useContext(LogContext);

    const navigate = useNavigate()

    useEffect(() => {
      
      if (!isLoggedIn) {
        navigate("/login");
      }
    }, []);

    return element
  };

  export default ProtectedRoute;