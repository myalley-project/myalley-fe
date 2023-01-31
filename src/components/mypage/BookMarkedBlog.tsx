import { AxiosResponse } from "axios";
import React, { useCallback, useEffect } from "react";
import { BlogReviewListRes, BookMarkedBlogApi } from "../../apis/member";
import useGetNewTokenApi from "../../apis/useGetRefreshToken";
import isApiError from "../../utils/isApiError";

const BookMarkedBlog = () => {
  const getNewTokenApi = useGetNewTokenApi;
  const TestPageNo = 1;

  const getBookMarkedBlog = useCallback(
    async (pageNo: number) => {
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const res: AxiosResponse<BlogReviewListRes> = await BookMarkedBlogApi(
          pageNo
        );
        console.log(res);
      } catch (err) {
        const errorRes = isApiError(err);
        if (errorRes === "accessToken 만료") {
          await getNewTokenApi(refreshToken);
          const reRes: AxiosResponse<BlogReviewListRes> =
            await BookMarkedBlogApi(pageNo);
          if (!reRes) return;
          const refreshData = reRes.data;
        }
      }
    },
    [getNewTokenApi]
  );

  useEffect(() => {
    getBookMarkedBlog(TestPageNo);
  }, [getBookMarkedBlog]);

  return <div>북마크 한 블로그 목록</div>;
};

export default BookMarkedBlog;
