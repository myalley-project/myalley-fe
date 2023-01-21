import axios, { AxiosHeaders } from "axios";

axios.defaults.withCredentials = true;
axios.defaults.validateStatus = (status) =>
  status === 200 ||
  status === 400 ||
  status === 401 ||
  status === 403 ||
  status === 404 ||
  status === 409;
// axios.defaults.validateStatus = () => true; // 모든 status 코드

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
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
