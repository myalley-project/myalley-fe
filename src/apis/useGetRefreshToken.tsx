import { AxiosResponse } from "axios";
import apiInstance from "../utils/apiInstance";
import isApiError from "../utils/isApiError";
import removeLocalStorageItem from "../utils/removeLocalStorageItem";
import { RefreshTokenRes } from "./useRefreshToken";

const useGetNewTokenApi = async (token: string | null) => {
  if (token) {
    try {
      const res: AxiosResponse<RefreshTokenRes> = await apiInstance.post(
        "/refresh",
        {
          refreshToken: `Bearer ${token}`,
        }
      );
      const { accessToken, refreshToken } = res.data;
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
    } catch (error) {
      const refreshErrorRes = isApiError(error, "refreshToken 만료");
      if (typeof refreshErrorRes !== "object") return;
      const refreshErrorMsg = refreshErrorRes.errorMsg;
      if (refreshErrorMsg === "Forbidden") {
        removeLocalStorageItem();
        alert("자동 로그인 기간이 만료되었습니다. 다시 로그인해주세요.");
      }
    }
  }
};

export default useGetNewTokenApi;
