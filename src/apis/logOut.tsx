import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useRefreshTokenApi from "./useRefreshToken";
import apiInstance from "../utils/apiInstance";
import isApiError, { errorAlert } from "../utils/isApiError";
import removeLocalStorageItem from "../utils/removeLocalStorageItem";

// 로그아웃 커스텀훅_박예선_2023.02.06
// 사용법: const logOut = useLogOut();
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
        console.log("리프레시토큰 메세지 받음");
        try {
          await refreshTokenApi();
          console.log("토큰 잘 받음");
          const res: AxiosResponse<LogOutRes> = await apiInstance.post(
            "/api/me/logout"
          );
          console.log("다시 로그아웃 실행");
          console.log("다시 실행한 로그아웃 응답", res);
          const { resultCode } = res.data;
          if (resultCode === 200) {
            console.log("다시 로그아웃 성공");
            removeLocalStorageItem();
            alert("로그아웃되었습니다.");
            navigate("/");
          }
        } catch {
          console.log("로그아웃 아예 실패");
          errorAlert();
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
