import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useRefreshTokenApi from "./useRefreshToken";
import apiInstance from "../utils/apiInstance";
import isApiError from "../utils/isApiError";
import removeLocalStorageItem from "../utils/removeLocalStorageItem";

// 로그아웃 커스텀훅_박예선_2023.01.30
// 단순 로그아웃 시 호출: useLogOut();
// refresh_token 만료 로그아웃 시 호출: useLogOut("refresh_token 만료");
const useLogOut = () => {
  const navigate = useNavigate();
  const refreshTokenApi = useRefreshTokenApi();

  const logOut = async () => {
    try {
      const res: AxiosResponse<LogOutRes> = await apiInstance.post(
        "/api/me/logout"
      );
      const { resultCode } = res.data;
      if (resultCode === 200) {
        removeLocalStorageItem();
        alert("로그아웃되었습니다.");
        navigate("/");
        return;
      }
    } catch (err) {
      const errorRes = isApiError(err);
      if (errorRes === "accessToken 만료") {
        refreshTokenApi();
        const res: AxiosResponse<LogOutRes> = await apiInstance.post(
          "/api/me/logout"
        );
        const { resultCode } = res.data;
        if (resultCode === 200) {
          removeLocalStorageItem();
          alert("로그아웃되었습니다.");
          navigate("/");
        }
      }
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
