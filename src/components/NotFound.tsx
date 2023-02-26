import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    alert("데이터를 불러올 수 없습니다.");
    navigate("/");
  });

  return null;
};

export default NotFound;
