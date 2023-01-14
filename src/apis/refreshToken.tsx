import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";

interface RefreshTokenRes {
  access_token?: string;
  refresh_token?: string;
  errorCode?: number;
  errorMsg?: string;
}

// refresh토큰 요청 api_박예선_2023.01.14
const refreshTokenApi = async () => {
  const token = localStorage.getItem("refresh_token");
  const reqBody = {
    refresh_token: token,
  };
  try {
    const res: AxiosResponse<RefreshTokenRes> = await apiInstance.post(
      "/refresh",
      reqBody
    );
    const { access_token, refresh_token, errorMsg } = res.data;
    if (access_token && refresh_token) {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      return;
    }
    if (errorMsg) {
      alert("로그인 기간이 만료되었습니다. 다시 로그인해주세요.");
      // 나영님 로그아웃 api 완성되면 호출하기
      return;
    }
  } catch (err) {
    alert(
      "죄송합니다. 통신오류로 인해 요청을 실패하였습니다.\n다시 시도해주십시오"
    );
  }
};

export default refreshTokenApi;
