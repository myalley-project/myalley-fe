// 403 Forbidden 응답 처리 함수_박예선_23.01.21 // 임시
const isForbidden = (errorCode: number, errorMsg: string) => {
  if (errorCode === 403 && errorMsg === "Forbidden") {
    alert("403 Forbidden\n유효하지 않은 접근입니다. 다시 시도해주십시오.");
    return true;
  }
  return false;
};

// 액세스토큰 만료 응답 처리 함수_박예선_23.01.21 // 임시
const isAccessTokenExpired = (errorCode: number, errorMsg: string) => {
  if (errorCode === 403 && errorMsg === "ACCESS토큰 만료") {
    // refresh token 인증 api 호출(추후 추가 예정)
    return true;
  }
  return false;
};

// api 에러 응답형식 확인 후 리턴하는 함수_박예선_23.01.21
// -----------[ 사용방법 ]-----------
// try {
//     api 요청/호출
//     ~~요청 성공 시 로직 작성~~
// } catch (err) {                     // 필수
//   const errorRes = isApiError(err); // 필수
//     if (!errorRes) return;          // 필수
//     ~~요청 실패 시 로직 작성~~
//     // 이때 errorRes의 타입 -> { errorMsg: string,, errorCode: number }
// }
const isApiError = (err: unknown) => {
  if (err && typeof err === "object" && "response" in err) {
    const { response } = err;
    if (response && typeof response === "object" && "data" in response) {
      const { data } = response;
      if (
        data &&
        typeof data === "object" &&
        "errorCode" in data &&
        "errorMsg" in data
      ) {
        const { errorCode, errorMsg } = data;
        if (typeof errorCode === "number" && typeof errorMsg === "string") {
          if (isForbidden(errorCode, errorMsg)) return undefined; // 403 Forbidden 에러 자동 처리
          if (isAccessTokenExpired(errorCode, errorMsg)) return undefined; // 액세스토큰 만료 에러 자동 처리
          return { errorMsg, errorCode };
          // 위의 두 개의 에러 제외한 백엔드에서 {errorMsg,errorCode} 형식으로 보낸 에러는 리턴
          // 리턴받은 에러로 catch문에서 에러처리
        }
      }
    }
  }
  alert("죄송합니다.\n네트워크 오류입니다. 다시 시도해주십시오.");
  return undefined;
};

export default isApiError;
