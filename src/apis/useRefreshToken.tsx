import axios, { AxiosResponse } from "axios";
import useLogOut from "./useLogOut";
import apiInstance from "../utils/apiInstance";

// refresh토큰 요청 api_박예선_2023.01.16
const useRefreshTokenApi = () => {
  const logOut = useLogOut("refresh_token 만료");
  const token = localStorage.getItem("refresh_token");
  const reqBody = {
    refresh_token: token,
  };

  interface RefreshTokenRes {
    access_token?: string;
    refresh_token?: string;
    errorCode?: 403;
    errorMsg?: "Forbidden";
  }

  const refreshTokenApi = async () => {
    try {
      const res: AxiosResponse<RefreshTokenRes> =
        //    await apiInstance.post(
        //   "/refresh",
        //   reqBody
        // );
        await axios.get("/data/refreshToken.json");
      const { access_token, refresh_token, errorMsg } = res.data;
      if (access_token && refresh_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        return "access_token 재발급 완료";
      }
      if (errorMsg === "Forbidden") {
        alert("자동 로그인 기간이 만료되어 로그아웃됩니다.");
        await logOut();
        return null;
      }
      return null;
    } catch (err) {
      alert(
        "죄송합니다. 통신오류로 인해 요청을 실패하였습니다.\n다시 시도해주십시오"
      );
      return null;
    }
  };

  return refreshTokenApi;
};

export default useRefreshTokenApi;
