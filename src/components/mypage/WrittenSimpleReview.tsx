import { AxiosResponse } from "axios";
import React, { useCallback, useEffect } from "react";
import { MySimpleReviewRes, mySimpleReviewsApi } from "../../apis/member";
import isApiError from "../../utils/isApiError";

const WrittenSimpleReview = () => {
  // 한줄 리뷰 목록 조회 컴포넌트 붙여야함
  // 페이지네이션과 연결하는 로직 짜야함
  const testPageNo = 1;

  // 내가 쓴 한줄 리뷰 목록 조회
  const getSimpleReview = useCallback(async (pageNo: number) => {
    try {
      const res: AxiosResponse<MySimpleReviewRes> = await mySimpleReviewsApi(
        pageNo
      );
      console.log(res);
    } catch (err) {
      isApiError(err);
    }
  }, []);

  useEffect(() => {
    getSimpleReview(testPageNo);
  }, [getSimpleReview, testPageNo]);

  return <div>한줄리뷰 목록 조회</div>;
};

export default WrittenSimpleReview;
