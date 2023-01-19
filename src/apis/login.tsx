import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";

export interface LoginRes {
  access_token?: string;
  refresh_token?: string;
  errorCode?: number;
  errorMsg?: string;
}

// 로그인 api_박예선_23.01.13
const loginApi = async (loginInfo: { email: string; password: string }) => {
  const { email, password } = loginInfo;
  const reqBody = { email, password };
  const res: AxiosResponse<LoginRes> = await apiInstance.post(
    "/login",
    reqBody
  );
  return res;
};

export default loginApi;
