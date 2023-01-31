import { AxiosResponse } from "axios";
import React, { useCallback, useEffect } from "react";
import { BlogReviewListRes, BookMarkedBlogApi } from "../../apis/member";
import isApiError from "../../utils/isApiError";

const BookMarkedBlog = () => {
  const TestPageNo = 1;

  const getBookMarkedBlog = useCallback(async (pageNo: number) => {
    try {
      const res: AxiosResponse<BlogReviewListRes> = await BookMarkedBlogApi(
        pageNo
      );
      console.log(res);
    } catch (err) {
      isApiError(err);
    }
  }, []);

  useEffect(() => {
    getBookMarkedBlog(TestPageNo);
  }, [getBookMarkedBlog]);

  return <div>북마크 한 블로그 목록</div>;
};

export default BookMarkedBlog;
