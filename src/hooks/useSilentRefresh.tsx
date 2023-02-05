import { useState } from "react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { RefreshTokenRes } from "../apis/useRefreshToken";
import apiInstance from "../utils/apiInstance";

const useSilentRefresh = () => {
  const [refreshStop, setRefreshStop] = useState(false);

  useQuery(["silentRefresh"], getSilentRefreshToken, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    refetchInterval: refreshStop ? false : 30 * 60 * 1000,
    refetchIntervalInBackground: true,
    onError: () => {
      setRefreshStop(true);
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
