import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import apiInstance from "../utils/apiInstance";

type UseLogOutType = "refresh_token 만료";

// 로그아웃 커스텀훅_박예선_2023.01.16
// 단순 로그아웃 시 호출: useLogOut();
// refresh_token 만료 로그아웃 시 호출: useLogOut("refresh_token 만료");
const useLogOut = (type?: UseLogOutType) => {
  const navigate = useNavigate();

  interface LogOutRes {
    resultCode?: number;
    errorCode?: 403;
    errorMsg?: "Forbidden";
  }

  const logOut = async () => {
    try {
      const res: AxiosResponse<LogOutRes> =
        //   await apiInstance.post(
        //   "/api/me/logout"
        // );
        await axios.get("/data/logOut.json"); // 테스트용 목데이터
      const { resultCode, errorMsg } = res.data;
      if (resultCode === 200) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/");
        if (!type) {
          alert("로그아웃되었습니다.");
          return;
        }
      }
      if (errorMsg === "Forbidden") {
        alert("유효하지 않은 요청입니다. 다시 시도해주십시오.");
      }
    } catch (err) {
      alert(
        "죄송합니다.\n통신에 오류가 있어 로그아웃에 실패하였습니다. 다시 시도해주십시오."
      );
    }
  };

  return logOut;
};

export default useLogOut;
