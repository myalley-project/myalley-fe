import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import useLogOut from "./logOut";

// refresh토큰 요청 api_박예선_2023.01.19
const useRefreshTokenApi = () => {
  const navigate = useNavigate();
  const logOut = useLogOut("refresh_token 만료");
  const token = localStorage.getItem("refreshToken");

  const refreshTokenApi = async () => {
    if (token)
      try {
        const res: AxiosResponse<RefreshTokenRes> = await apiInstance.post(
          "/refresh",
          { refreshToken: `Bearer ${token}` }
        );
        // await axios.get("/data/refreshToken.json"); // 테스트용 목데이터
        console.log(res.data);
        const { accessToken, refreshToken, errorMsg } = res.data;
        if (accessToken && refreshToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
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
  accessToken?: string;
  refreshToken?: string;
  errorCode?: 403;
  errorMsg?: "Forbidden";
}
