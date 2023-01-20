import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import useLogOut from "./logOut";

// refresh토큰 요청 api_박예선_2023.01.19
const useRefreshTokenApi = () => {
  const navigate = useNavigate();
  const logOut = useLogOut("refresh_token 만료");
  const token = localStorage.getItem("refresh_token");

  const refreshTokenApi = async () => {
    if (token)
      try {
        const res: AxiosResponse<RefreshTokenRes> = await apiInstance.post(
          "/refresh",
          { refresh_token: `Bearer ${token}` }
        );
        await axios.get("/data/refreshToken.json"); // 테스트용 목데이터
        const { access_token, refresh_token, errorMsg } = res.data;
        if (access_token && refresh_token) {
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
        }
        if (errorMsg === "Forbidden") {
          await logOut();
          alert("자동 로그인 기간이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/login");
        }
      } catch (err) {
        alert(
          "죄송합니다. 통신오류로 인해 요청을 실패하였습니다.\n다시 시도해주세요."
        );
      }
  };
  return refreshTokenApi;
};

export default useRefreshTokenApi;

interface RefreshTokenRes {
  access_token?: string;
  refresh_token?: string;
  errorCode?: 403;
  errorMsg?: "Forbidden";
}
