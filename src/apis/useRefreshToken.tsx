import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import useLogOut from "./logOut";
import isApiError, { errorAlert } from "../utils/isApiError";

// refresh토큰 요청 api_박예선_2023.01.23
const useRefreshTokenApi = () => {
  const navigate = useNavigate();
  const logOut = useLogOut("refreshToken 만료");
  const token = localStorage.getItem("refreshToken");

  const refreshTokenApi = async () => {
    if (!token) return errorAlert();
    if (token)
      try {
        const res: AxiosResponse<RefreshTokenRes> = await apiInstance.post(
          "/refresh",
          { refreshToken: `Bearer ${token}` }
        );
        // await axios.get("/data/refreshToken.json"); // 테스트용 목데이터
        const { accessToken, refreshToken } = res.data;
        if (accessToken && refreshToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
      } catch (err) {
        const errorRes = isApiError(err, "refreshToken 만료");
        if (typeof errorRes !== "object") return undefined;
        const { errorMsg } = errorRes;
        if (errorMsg === "Forbidden") {
          await logOut();
          alert("자동 로그인 기간이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/login");
        }
      }
    return undefined;
  };

  return refreshTokenApi;
};

export default useRefreshTokenApi;

interface RefreshTokenRes {
  accessToken?: string;
  refreshToken?: string;
  errorCode?: 403;
  errorMsg?: "Forbidden";
}
