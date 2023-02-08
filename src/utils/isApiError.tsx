import { alertError } from "./alerts";

// api 에러 응답형식 확인 후 리턴하는 함수_박예선_23.01.23
// -----------[ 사용방법 ]-----------
// try {
//   // api 요청/호출
//   // ~~요청 성공 시 로직 작성~~
// } catch (err) {
//   const errorRes = isApiError(err);                        // 필수, type은 refreshToken에서만 사용하니 err만 넣어주세요
//   if (errorRes === "accessToken 만료") refreshTokenApi();   // 토큰 필요한 요청에서는 필수
//   if (typeof errorRes !== "object") return;                // 필수
//   const { errorCode, errorMsg } = errorRes;                // 에러처리 로직에 따라 선택
//   // ~~요청 실패 시 로직 작성~~
//   // 이때 errorRes의 타입 -> { errorMsg: string, errorCode: number }
// }
const isApiError = (err: unknown, type?: "refreshToken 만료") => {
  if (!(err && typeof err === "object" && "response" in err))
    return alertError();
  const { response } = err;
  if (!(response && typeof response === "object" && "data" in response))
    return alertError();
  const { data } = response;
  if (
    data &&
    typeof data === "object" &&
    "errorCode" in data &&
    "errorMsg" in data
  ) {
    const { errorCode, errorMsg } = data;
    if (!(typeof errorCode === "number" && typeof errorMsg === "string"))
      return alertError();
    // 403 Forbidden 에러 자동 처리
    if (!type && errorCode === 403 && errorMsg === "Forbidden")
      return alert(
        "403 Forbidden\n유효하지 않은 접근입니다. 다시 시도해주십시오."
      );
    // accessToken 만료 메세지를 리턴해 refreshToken api 호출 유도
    if (errorCode === 403 && errorMsg === "ACCESS토큰 만료")
      return "accessToken 만료";
    // 위의 두 에러를 제외한 백엔드에서 { errorMsg,errorCode } 형식으로 보낸 에러는 리턴
    // 리턴받은 에러로 catch문에서 각자 필요한 에러 처리
    return { errorMsg, errorCode };
  }
  return alertError();
};

export default isApiError;
