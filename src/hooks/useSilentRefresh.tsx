import { useState } from "react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { RefreshTokenRes } from "../apis/useRefreshToken";
import apiInstance from "../utils/apiInstance";

const useSilentRefresh = () => {
  const [refreshStop, setRefreshStop] = useState(false);
  const RefreshExpireDate = JSON.parse(
    localStorage.getItem("refreshExpireDate") as string
  ) as string;

  if (!RefreshExpireDate || new Date(RefreshExpireDate) > new Date()) {
    localStorage.clear();
    alert("자동 로그인 기간이 만료되었습니다. 다시 로그인해주세요");
  }

  useQuery(["silentRefresh"], getSilentRefreshToken, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    refetchInterval: refreshStop ? false : 30 * 60 * 1000,
    refetchIntervalInBackground: true,
    onError: () => {
      setRefreshStop(true);
      localStorage.clear();
      alert("로그인 중 문제가 생겼습니다. 다시 로그인해주세요.");
    },
    onSuccess: (data) => {
      const accessToken = data?.accessToken;
      const refreshToken = data?.refreshToken;
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
    },
  });
};

export default useSilentRefresh;

async function getSilentRefreshToken() {
  const token = localStorage.getItem("refreshToken");
  if (token) {
    const res: AxiosResponse<RefreshTokenRes> = await apiInstance.post(
      "/refresh",
      {
        refreshToken: `Bearer ${token}`,
      }
    );
    return res?.data;
  }
  return null;
}
