import axios, { AxiosHeaders } from "axios";

axios.defaults.withCredentials = true;

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const newConfig = config;
    if (newConfig.headers)
      (newConfig.headers as unknown as AxiosHeaders).set(
        "Authorization",
        token ? `Bearer ${token}` : null
      );
    return newConfig;
  },
  (err) => Promise.reject(err)
);

export default apiInstance;
