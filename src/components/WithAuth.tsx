import React, { ComponentType } from "react";
import { useNavigate } from "react-router-dom";

export default function WithAuth(Component: ComponentType) {
  const accessToken = localStorage.getItem("accessToken");

  /* eslint-disable */
  return function Auth<P extends {}>(props: P | undefined) {
    const navigate = useNavigate();

    React.useEffect(() => {
      if (!accessToken) {
        alert("로그인이 필요한 페이지입니다.");
        navigate("/login");
      }
    });

    return <Component {...props} />;
  };
}
