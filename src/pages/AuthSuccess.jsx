import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const returnTo = localStorage.getItem("returnTo") || "/";

    if (token) {
      localStorage.setItem("token", token);
      localStorage.removeItem("returnTo"); // Cleanup logic
      navigate(returnTo);
    } else {
      navigate("/");
    }
  }, []);

  return <div>Logging in...</div>;
};

export default AuthSuccess;
