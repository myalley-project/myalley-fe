import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import apiInstance from "../utils/apiInstance";
import isApiError from "../utils/isApiError";

// 로그아웃 커스텀훅_박예선_2023.01.25
// 단순 로그아웃 시 호출: useLogOut();
// refresh_token 만료 로그아웃 시 호출: useLogOut("refresh_token 만료");
const useLogOut = (type?: "refreshToken 만료") => {
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const res: AxiosResponse<LogOutRes> = await apiInstance.post(
        "/api/me/logout"
      );
      const { resultCode } = res.data;
      if (resultCode === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("memberId");
        localStorage.removeItem("email");
        localStorage.removeItem("nickname");
        localStorage.removeItem("memberImage");
        localStorage.removeItem("authority");
        if (!type) {
          alert("로그아웃되었습니다.");
          navigate("/");
          return;
        }
      }
    } catch (err) {
      isApiError(err);
    }
  };
  return logOut;
};

export default useLogOut;

interface LogOutRes {
  resultCode?: number;
  errorCode?: 403;
  errorMsg?: "Forbidden";
}
