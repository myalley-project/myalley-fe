import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = (message: string) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    alert(message);
    navigate("/");
  });

  return null;
};

export default NotFound;
