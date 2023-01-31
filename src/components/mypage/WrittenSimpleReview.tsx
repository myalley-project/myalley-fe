import { AxiosResponse } from "axios";
import React, { useCallback, useEffect } from "react";
import { MySimpleReviewRes, mySimpleReviewsApi } from "../../apis/member";
import useGetNewTokenApi from "../../apis/useGetRefreshToken";
import isApiError from "../../utils/isApiError";

const WrittenSimpleReview = () => {
  const getNewTokenApi = useGetNewTokenApi;
  // 한줄 리뷰 목록 조회 컴포넌트 붙여야함
  // 페이지네이션과 연결하는 로직 짜야함
  const testPageNo = 1;

  // 내가 쓴 한줄 리뷰 목록 조회
  const getSimpleReview = useCallback(
    async (pageNo: number) => {
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const res: AxiosResponse<MySimpleReviewRes> = await mySimpleReviewsApi(
          pageNo
        );
        console.log(res);
      } catch (err) {
        const errorRes = isApiError(err);
        if (errorRes === "accessToken 만료") {
          await getNewTokenApi(refreshToken);
          const reRes: AxiosResponse<MySimpleReviewRes> =
            await mySimpleReviewsApi(pageNo);
          if (!reRes) return;
          const refreshData = reRes.data;
        }
      }
    },
    [getNewTokenApi]
  );

  useEffect(() => {
    getSimpleReview(testPageNo);
  }, [getSimpleReview, testPageNo]);

  return <div>한줄리뷰 목록 조회</div>;
};

export default WrittenSimpleReview;
