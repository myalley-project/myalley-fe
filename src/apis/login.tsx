import axios, { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";

export interface LoginRes {
  accessToken?: string;
  refreshToken?: string;
  errorCode?: number;
  errorMsg?: string;
}

// 로그인 api_박예선_23.01.20
const loginApi = async (loginInfo: { email: string; password: string }) => {
  const { email, password } = loginInfo;
  const reqBody = { email, password };
  const res: AxiosResponse<LoginRes> =
    // await apiInstance.post(
    //   "/login",
    //   reqBody
    // );
    await axios.get("/data/login.json"); // 테스트용 목데이터

  return res;
};

export default loginApi;
