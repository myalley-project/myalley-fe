import { AxiosResponse } from "axios";
import { Infos } from "../types/signUp";
import apiInstance from "../utils/apiInstance";

export interface SignUpRes {
  resultCode?: number;
}

// 회원가입 api_박예선_2023.01.21
const signUpApi = async (infos: Infos, isAdmin: boolean) => {
  const { email, password, gender, birth, nickname, name, adminNo } = infos;
  const month = `00${birth.month}`.slice(-2);
  const day = `00${birth.day}`.slice(-2);
  const reqBody = {
    email,
    password,
    gender: isAdmin ? null : gender,
    birth: isAdmin ? null : `${birth.year}-${month}-${day}`,
    nickname: isAdmin ? name : nickname,
    adminNo: isAdmin ? adminNo : null,
  };
  const res: AxiosResponse<SignUpRes> = await apiInstance.post(
    "/signup",
    reqBody
  );
  return res;
};

export default signUpApi;
