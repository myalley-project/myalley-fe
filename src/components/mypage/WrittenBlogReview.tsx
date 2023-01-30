import { AxiosResponse } from "axios";
import React, { useCallback, useEffect } from "react";
import { BlogReviewListRes, myBlogReviewsApi } from "../../apis/member";
import isApiError from "../../utils/isApiError";

const WrittenBlogReview = () => {
  // 블로그 리뷰 목록 조회 컴포넌트 붙여야함
  // 페이지네이션과 연결하는 로직 짜야함
  const testPageNo = 1;

  // 내가 쓴 블로그 리뷰 목록 조회
  const getBlogReview = useCallback(async (pageNo: number) => {
    try {
      const res: AxiosResponse<BlogReviewListRes> = await myBlogReviewsApi(
        pageNo
      );
      console.log(res);
    } catch (err) {
      isApiError(err);
    }
  }, []);

  useEffect(() => {
    getBlogReview(testPageNo);
  }, [getBlogReview, testPageNo]);
  return <div>블로그 리뷰 목록 조회</div>;
};

export default WrittenBlogReview;
